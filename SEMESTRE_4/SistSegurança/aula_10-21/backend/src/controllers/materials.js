import { registrarLog } from "./logs.js";

// Registra o log sem interromper a operação principal caso falhe.
async function registrarLogSeguro(req, dados) {
  try {
    await registrarLog(req, dados);
  } catch (error) {
    console.error("Erro ao registrar log:", error);
  }
}

// Lista e pesquisa materiais e usuários conforme o perfil autenticado.
export async function listMaterials(req, res) {
  if (!req.user?.sub || !req.user?.role) {
    return res.status(401).json({
      message: "Usuário não autenticado.",
    });
  }

  const pesquisa = String(req.query.search || "").trim();
  const termo = `%${pesquisa}%`;
  const db = req.app.locals.db;

  // USER: pode pesquisar somente produtos por nome ou categoria.
  if (req.user.role === "user") {
    const [materials] = await db.execute(
      `SELECT id, name, category
       FROM materials
       WHERE name LIKE ? OR category LIKE ?
       ORDER BY id`,
      [termo, termo]
    );

    return res.json({
      produtos: materials,
      usuarios: [],
    });
  }

  // ADMIN: pode pesquisar produtos e usuários.
  if (req.user.role === "admin") {
    const [materials] = await db.execute(
      `SELECT id, name, category
       FROM materials
       WHERE name LIKE ? OR category LIKE ?
       ORDER BY id`,
      [termo, termo]
    );

    const [users] = await db.execute(
      `SELECT id, name, email, role
       FROM users
       WHERE name LIKE ? OR email LIKE ?
       ORDER BY id`,
      [termo, termo]
    );

    return res.json({
      produtos: materials,
      usuarios: users,
    });
  }

  return res.status(403).json({
    message: "Perfil não autorizado.",
  });
}

// Exclui material. A rota também deve exigir perfil admin.
export async function deleteMaterial(req, res) {
  if (!req.user?.sub) {
    return res.status(401).json({
      message: "Usuário não autenticado.",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Apenas administradores podem excluir materiais.",
    });
  }

  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "ID inválido.",
    });
  }

  const db = req.app.locals.db;

  // Consulta os dados antes da exclusão para registrar o valor antigo.
  const [materials] = await db.execute(
    "SELECT id, name, category FROM materials WHERE id = ?",
    [id]
  );

  if (materials.length === 0) {
    return res.status(404).json({
      message: "Material não encontrado.",
    });
  }

  const material = materials[0];

  const [result] = await db.execute(
    "DELETE FROM materials WHERE id = ?",
    [id]
  );

  if (!result.affectedRows) {
    return res.status(404).json({
      message: "Material não encontrado.",
    });
  }

  // Registra a exclusão na tabela logs.
  await registrarLogSeguro(req, {
    usuario: req.user.sub,
    acao: "DELETE",
    recurso_afetado: "materials",
    id_recurso_afetado: id,
    valor_antigo: {
      name: material.name,
      category: material.category,
    },
    campos_alterados: {
      descricao: "Material excluído com sucesso",
    },
    codigo_http: 204,
    status_acao: "SUCESSO",
  });

  return res.status(204).end();
}