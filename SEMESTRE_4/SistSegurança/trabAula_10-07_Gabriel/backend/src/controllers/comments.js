// Lista os comentários de um material.
export async function listComments(req, res) {
  const materialId = Number(req.params.materialId);

  if (!Number.isSafeInteger(materialId) || materialId <= 0) {
    return res.status(400).json({
      message: "ID do material inválido."
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

  res.json(rows);
}


// Cria um comentário.
export async function createComment(req, res) {
  const materialId = Number(req.params.materialId);
  const comment = req.body.comment;

  if (!Number.isSafeInteger(materialId) || materialId <= 0) {
    return res.status(400).json({
      message: "ID do material inválido."
    });
  }

  // O comentário precisa ser texto.
  if (typeof comment !== "string") {
    return res.status(400).json({
      message: "O comentário deve ser um texto."
    });
  }

  const text = comment.trim();

  // Entre 1 e 500 caracteres.
  if (text.length < 1 || text.length > 500) {
    return res.status(400).json({
      message: "O comentário deve ter entre 1 e 500 caracteres."
    });
  }

  // Verifica se o material existe.
  const [materials] = await req.app.locals.db.execute(
    "SELECT id FROM materials WHERE id = ?",
    [materialId]
  );

  if (materials.length === 0) {
    return res.status(404).json({
      message: "Material não encontrado."
    });
  }

  // O usuário vem do JWT.
  const [result] = await req.app.locals.db.execute(
    `INSERT INTO comments (user_id, material_id, comment)
     VALUES (?, ?, ?)`,
    [req.user.sub, materialId, text]
  );

  res.status(201).json({
    id: result.insertId,
    comment: text,
    message: "Comentário criado com sucesso."
  });
}