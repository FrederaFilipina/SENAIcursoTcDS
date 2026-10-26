import { registrarLog } from "./logs.js";

// Registra o log sem interromper a operação principal caso falhe.
async function registrarLogSeguro(req, dados) {
  try {
    await registrarLog(req, dados);
  } catch (error) {
    console.error("Erro ao registrar log:", error);
  }
}

// Lista os comentários de um material.
export async function listComments(req, res) {
  const materialId = Number(req.params.materialId);

  if (!Number.isSafeInteger(materialId) || materialId <= 0) {
    return res.status(400).json({
      message: "ID do material inválido.",
    });
  }

  const [rows] = await req.app.locals.db.execute(
    `SELECT
      comments.id,
      comments.comment,
      comments.created_at,
      users.name AS user_name
    FROM comments
    INNER JOIN users ON users.id = comments.user_id
    WHERE comments.material_id = ?
    ORDER BY comments.created_at DESC`,
    [materialId]
  );

  return res.json(rows);
}

// Cria um comentário.
export async function createComment(req, res) {
  const materialId = Number(req.params.materialId);
  const comment = req.body?.comment;

  if (!Number.isSafeInteger(materialId) || materialId <= 0) {
    return res.status(400).json({
      message: "ID do material inválido.",
    });
  }

  if (typeof comment !== "string") {
    return res.status(400).json({
      message: "O comentário deve ser um texto.",
    });
  }

  const text = comment.trim();

  if (text.length < 1 || text.length > 500) {
    return res.status(400).json({
      message: "O comentário deve ter entre 1 e 500 caracteres.",
    });
  }

  const db = req.app.locals.db;

  // Verifica se o material existe.
  const [materials] = await db.execute(
    "SELECT id FROM materials WHERE id = ?",
    [materialId]
  );

  if (materials.length === 0) {
    return res.status(404).json({
      message: "Material não encontrado.",
    });
  }

  // O usuário deve ser fornecido pelo middleware de autenticação.
  if (!req.user?.sub) {
    return res.status(401).json({
      message: "Usuário não autenticado.",
    });
  }

  const [result] = await db.execute(
    `INSERT INTO comments (user_id, material_id, comment)
     VALUES (?, ?, ?)`,
    [req.user.sub, materialId, text]
  );

  await registrarLogSeguro(req, {
    usuario: req.user.sub,
    acao: "INSERT",
    recurso_afetado: "comments",
    id_recurso_afetado: result.insertId,
    valor_novo: text,
    campos_alterados: {
      material_id: materialId,
    },
    codigo_http: 201,
    status_acao: "SUCESSO",
  });

  return res.status(201).json({
    id: result.insertId,
    comment: text,
    message: "Comentário criado com sucesso.",
  });
}

// A rota deve garantir que somente administradores possam excluir comentários.
export async function deleteComment(req, res) {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "ID do comentário inválido.",
    });
  }

  if (!req.user?.sub) {
    return res.status(401).json({
      message: "Usuário não autenticado.",
    });
  }

  const db = req.app.locals.db;

  // Busca o comentário antes de excluí-lo para registrar os dados anteriores.
  const [comments] = await db.execute(
    "SELECT id, user_id, material_id, comment FROM comments WHERE id = ?",
    [id]
  );

  if (comments.length === 0) {
    return res.status(404).json({
      message: "Comentário não encontrado.",
    });
  }

  const comentario = comments[0];

  const [result] = await db.execute(
    "DELETE FROM comments WHERE id = ?",
    [id]
  );

  if (!result.affectedRows) {
    return res.status(404).json({
      message: "Comentário não encontrado.",
    });
  }

  await registrarLogSeguro(req, {
    usuario: req.user.sub,
    acao: "DELETE",
    recurso_afetado: "comments",
    id_recurso_afetado: id,
    valor_antigo: comentario.comment,
    campos_alterados: {
      usuario_comentario: comentario.user_id,
      material_id: comentario.material_id,
    },
    codigo_http: 204,
    status_acao: "SUCESSO",
  });

  return res.status(204).end();
}