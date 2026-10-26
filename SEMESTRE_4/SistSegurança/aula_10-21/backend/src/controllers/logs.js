export async function registrarLog(req, dados) {
  const db = req.app.locals.db;

  const {
    usuario = req.user?.sub ?? null,
    acao,
    recurso_afetado = null,
    id_recurso_afetado = null,
    valor_antigo = null,
    valor_novo = null,
    campos_alterados = null,
    codigo_http = null,
    status_acao = "SUCESSO",
  } = dados;

  const ip = req.ip || req.socket?.remoteAddress || null;

  function converterValor(valor) {
    if (valor == null) return null;

    return typeof valor === "object"
      ? JSON.stringify(valor)
      : String(valor);
  }

  await db.execute(
    `INSERT INTO logs (
      usuario,
      acao,
      recurso_afetado,
      id_recurso_afetado,
      valor_antigo,
      valor_novo,
      campos_alterados,
      ip,
      codigo_http,
      status_acao
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      usuario,
      acao,
      recurso_afetado,
      id_recurso_afetado == null
        ? null
        : String(id_recurso_afetado),
      converterValor(valor_antigo),
      converterValor(valor_novo),
      campos_alterados == null
        ? null
        : typeof campos_alterados === "string"
          ? campos_alterados
          : JSON.stringify(campos_alterados),
      ip,
      codigo_http,
      status_acao,
    ]
  );
}