
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Configuração do rate limit.
const MAX_TENTATIVAS = 5;
const TEMPO_BLOQUEIO = 5 * 60 * 1000; // 5 minutos

// Armazena as tentativas temporariamente na memória.
const tentativasLogin = new Map();

function obterChave(req, email) {
  const ip = req.ip || req.socket.remoteAddress || "ip-desconhecido";
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

function responderBloqueio(res, bloqueadoAte) {
  const segundos = Math.max(
    1,
    Math.ceil((bloqueadoAte - Date.now()) / 1000)
  );

  return res
    .status(429)
    .set("Retry-After", String(segundos))
    .json({
      message: `Muitas tentativas de login. Tente novamente em ${tempoRestante(bloqueadoAte)}.`,
      retryAfterSeconds: segundos,
    });
}

// Faz login e devolve um token com a role que veio do banco.
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

  const normalizedEmail = email.trim().toLowerCase();
  const chave = obterChave(req, normalizedEmail);
  const agora = Date.now();

  let registro = tentativasLogin.get(chave);

  // Se o bloqueio ainda estiver ativo, impede uma nova tentativa.
  if (registro?.bloqueadoAte && agora < registro.bloqueadoAte) {
    return responderBloqueio(res, registro.bloqueadoAte);
  }

  // Reinicia o contador depois que o bloqueio expira.
  if (registro?.bloqueadoAte && agora >= registro.bloqueadoAte) {
    tentativasLogin.delete(chave);
    registro = undefined;
  }

  // Consulta o usuário pelo e-mail.
  const [rows] = await req.app.locals.db.execute(
    "SELECT id, name, email, password_hash, role FROM users WHERE email = ?",
    [normalizedEmail]
  );

  const user = rows[0];

  // Compara a senha digitada com o hash salvo no banco.
  const senhaCorreta =
    user && (await bcrypt.compare(password, user.password_hash));

  if (!senhaCorreta) {
    const tentativas = (registro?.quantidade || 0) + 1;

    // Ao atingir cinco falhas, inicia o bloqueio de 15 minutos.
    if (tentativas >= MAX_TENTATIVAS) {
      const bloqueadoAte = Date.now() + TEMPO_BLOQUEIO;

      tentativasLogin.set(chave, {
        quantidade: tentativas,
        bloqueadoAte,
      });

      return responderBloqueio(res, bloqueadoAte);
    }

    tentativasLogin.set(chave, {
      quantidade: tentativas,
      bloqueadoAte: null,
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