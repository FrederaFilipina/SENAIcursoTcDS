
// Lista e pesquisa materiais e usuários conforme o perfil autenticado.

export async function listMaterials(req, res) {
  const pesquisa = String(req.query.search || "").trim();
  const termo = `%${pesquisa}%`;
  const db = req.app.locals.db;

  // USER: pode pesquisar somente produtos por nome ou categoria.
  if (req.user.role === "user") {
    const [materials] = await db.execute(
      `SELECT id, name, category FROM materials WHERE name LIKE ? OR category LIKE ? ORDER BY id `,
      [termo, termo]
    );

    return res.json({produtos: materials, usuarios: [] });
  }

  // ADMIN: pode pesquisar produtos e usuários.
  if (req.user.role === "admin") {
    const [materials] = await db.execute(
      `SELECT id, name, category FROM materials WHERE name LIKE ? OR category LIKE ? ORDER BY id`,
      [termo, termo]
    );

    const [users] = await db.execute(
      `SELECT id, name, email, role FROM users WHERE name LIKE ? OR email LIKE ? ORDER BY id `,
      [termo, termo]
    );

    return res.json({ produtos: materials, usuarios: users });
  }

  return res.status(403).json({ message: "Perfil não autorizado." });
}

// Exclui material: somente admin pode acessar esta função pela rota.
export async function deleteMaterial(req, res) {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "ID inválido."
    });
  }

  const [result] = await req.app.locals.db.execute(
    "DELETE FROM materials WHERE id = ?",
    [id]
  );

  if (!result.affectedRows) {
    return res.status(404).json({
      message: "Material não encontrado."
    });
  }

  return res.status(204).end();
}