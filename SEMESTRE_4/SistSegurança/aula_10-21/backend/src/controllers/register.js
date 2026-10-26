import bcrypt from "bcryptjs";
import { registrarLog } from "./logs.js";

// Registra o log sem interromper o cadastro caso ocorra uma falha na auditoria.
async function registrarLogSeguro(req, dados) {
  try {
    await registrarLog(req, dados);
  } catch (error) {
    console.error("Erro ao registrar log:", error);
  }
}

// Cadastro público: cria um usuário comum.
export async function register(req, res) {
  const { name, email, password } = req.body || {};

  // Valida os dados recebidos pela API.
  if (
    typeof name !== "string" ||
    !name.trim() ||
    name.trim().length > 100 ||
    typeof email !== "string" ||
    email.trim().length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
    typeof password !== "string" ||
    password.length < 8 ||
    Buffer.byteLength(password, "utf8") > 72
  ) {
    return res.status(400).json({
      message:
        "Informe nome (até 100 caracteres), e-mail válido e senha com pelo menos 8 caracteres e no máximo 72 bytes.",
    });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const db = req.app.locals.db;

  const [users] = await db.execute(
    "SELECT id FROM users WHERE email = ?",
    [normalizedEmail]
  );

  if (users.length > 0) {
    return res.status(409).json({
      message: "Este e-mail já está cadastrado.",
    });
  }

  // Armazena somente o hash da senha.
  const passwordHash = await bcrypt.hash(password, 10);

  let result;

  try {
    // O cadastro público sempre cria um usuário comum.
    const [insertResult] = await db.execute(
      `INSERT INTO users (name, email, password_hash, role)
       VALUES (?, ?, ?, ?)`,
      [name.trim(), normalizedEmail, passwordHash, "user"]
    );

    result = insertResult;
  } catch (error) {
    // O índice UNIQUE protege também contra cadastros simultâneos.
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "Este e-mail já está cadastrado.",
      });
    }

    throw error;
  }

  // Cadastro público: não há usuário autenticado responsável pela ação.
  // O ID criado fica em id_recurso_afetado.
  await registrarLogSeguro(req, {
    usuario: null,
    acao: "INSERT",
    recurso_afetado: "users",
    id_recurso_afetado: result.insertId,
    valor_novo: {
      name: name.trim(),
      email: normalizedEmail,
      role: "user",
    },
    codigo_http: 201,
    status_acao: "SUCESSO",
  });

  return res.status(201).json({
    message: "Cadastro realizado! Entre com seu e-mail e senha.",
  });
}