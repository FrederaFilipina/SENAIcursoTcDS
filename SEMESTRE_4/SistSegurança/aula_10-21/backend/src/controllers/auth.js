import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { registrarLog } from "./logs.js";

// Configuração do rate limit.
const MAX_TENTATIVAS = 5;
const TEMPO_BLOQUEIO = 5 * 60 * 1000; // 5 minutos

// Armazena as tentativas temporariamente na memória.
const tentativasLogin = new Map();

function obterChave(req, email) {
  const ip = req.ip || req.socket?.remoteAddress || "ip-desconhecido";
  return `${ip}:${email}`;
}

function tempoRestante(bloqueadoAte) {
  const segundos = Math.max(
    1,
    Math.ceil((bloqueadoAte - Date.now()) / 1000)
  );

  const minutos = Math.floor(segundos / 60);
  const segundosRestantes = segundos % 60;

  if (minutos > 0) {
    return `${minutos} min e ${segundosRestantes} s`;
  }

  return `${segundosRestantes} s`;
}

// Registra o log sem interromper a operação principal caso falhe.
async function registrarLogSeguro(req, dados) {
  try {
    await registrarLog(req, dados);
  } catch (error) {
    console.error("Erro ao registrar log:", error);
  }
}

// Responde quando o usuário está bloqueado e registra apenas um log.
async function responderBloqueio(req, res, bloqueadoAte) {
  const segundos = Math.max(
    1,
    Math.ceil((bloqueadoAte - Date.now()) / 1000)
  );

  await registrarLogSeguro(req, {
    acao: "LOGIN",
    recurso_afetado: "users",
    campos_alterados: {
      email: String(req.body?.email || "").trim().toLowerCase(),
      motivo: "Rate limit: login bloqueado",
    },
    codigo_http: 429,
    status_acao: "BLOQUEADO",
  });

  return res
    .status(429)
    .set("Retry-After", String(segundos))
    .json({
      message: `Muitas tentativas de login. Tente novamente em ${tempoRestante(bloqueadoAte)}.`,
      retryAfterSeconds: segundos,
    });
}

// Faz login e devolve um token com o perfil obtido do banco.
export async function login(req, res) {
  const { email, password } = req.body || {};

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email.trim() ||
    !password ||
    Buffer.byteLength(password, "utf8") > 72
  ) {
    return res.status(400).json({
      message: "Informe um e-mail e uma senha válidos.",
    });
  }

  // Impede tentativas de login se o segredo do JWT não estiver configurado.
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET não está configurado.");
    return res.status(500).json({
      message: "Erro interno de configuração do servidor.",
    });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const chave = obterChave(req, normalizedEmail);
  const agora = Date.now();

  let registro = tentativasLogin.get(chave);

  // Impede novas tentativas enquanto o bloqueio estiver ativo.
  if (registro?.bloqueadoAte && agora < registro.bloqueadoAte) {
    return responderBloqueio(req, res, registro.bloqueadoAte);
  }

  // Reinicia o contador quando o bloqueio expira.
  if (registro?.bloqueadoAte && agora >= registro.bloqueadoAte) {
    tentativasLogin.delete(chave);
    registro = undefined;
  }

  const [rows] = await req.app.locals.db.execute(
    "SELECT id, name, email, password_hash, role FROM users WHERE email = ?",
    [normalizedEmail]
  );

  const user = rows[0];

  // Compara a senha digitada com o hash armazenado.
  const senhaCorreta =
    user && (await bcrypt.compare(password, user.password_hash));

  if (!senhaCorreta) {
    const tentativas = (registro?.quantidade || 0) + 1;

    // Atingiu cinco falhas: inicia o bloqueio de cinco minutos.
    if (tentativas >= MAX_TENTATIVAS) {
      const bloqueadoAte = Date.now() + TEMPO_BLOQUEIO;

      tentativasLogin.set(chave, {
        quantidade: tentativas,
        bloqueadoAte,
      });

      // responderBloqueio registra o log; não registrar novamente aqui.
      return responderBloqueio(req, res, bloqueadoAte);
    }

    tentativasLogin.set(chave, {
      quantidade: tentativas,
      bloqueadoAte: null,
    });

    await registrarLogSeguro(req, {
      usuario: user?.id ?? null,
      acao: "LOGIN",
      recurso_afetado: "users",
      campos_alterados: {
        email: normalizedEmail,
        motivo: "Credenciais incorretas",
        tentativas,
      },
      codigo_http: 401,
      status_acao: "FALHA",
    });

    const restantes = MAX_TENTATIVAS - tentativas;

    return res.status(401).json({
      message: `E-mail ou senha incorretos. Você tem mais ${restantes} tentativa(s) antes do bloqueio.`,
      tentativasRestantes: restantes,
    });
  }

  // Um login bem-sucedido limpa as tentativas anteriores.
  tentativasLogin.delete(chave);

  // O perfil vem do banco, nunca da requisição do usuário.
  const token = jwt.sign(
    { role: user.role },
    process.env.JWT_SECRET,
    {
      subject: String(user.id),
      expiresIn: "1h",
      algorithm: "HS256",
    }
  );

  await registrarLogSeguro(req, {
    usuario: user.id,
    acao: "LOGIN",
    recurso_afetado: "users",
    id_recurso_afetado: user.id,
    codigo_http: 200,
    status_acao: "SUCESSO",
  });

  return res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
}