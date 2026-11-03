
export async function registerLog(connection, event) {
    const sql = `
        INSERT INTO logs (
            usuario,
            acao,
            mensagem,
            recurso_afetado,
            id_recurso_afetado,
            valor_antigo,
            valor_novo,
            campos_alterados,
            ip,
            codigo_http,
            status_acao
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await connection.execute(sql, [
        event.usuario,
        event.acao,
        event.mensagem,
        event.recurso_afetado,
        event.id_recurso_afetado,
        event.valor_antigo,
        event.valor_novo,
        event.campos_alterados,
        event.ip,
        event.codigo_http,
        event.status_acao
    ]);
}


// Lista os registros de auditoria.
export async function listLog(req, res) {
    try {
        const connection = req.app.locals.db;

        const sql = `
            SELECT
                l.id AS id_log,
                l.usuario AS usuario_log,
                u.name AS usuario_name,
                l.datahora AS datahora,
                l.acao AS acao,
                l.mensagem AS mensagem,
                l.recurso_afetado AS recurso_afetado,
                l.id_recurso_afetado AS id_recurso_afetado,
                l.valor_antigo AS valor_antigo,
                l.valor_novo AS valor_novo,
                l.campos_alterados AS campos_alterados,
                l.ip AS ip,
                l.codigo_http AS codigo_http,
                l.status_acao AS status_acao
            FROM logs AS l
            LEFT JOIN users AS u
                ON u.id = l.usuario
            ORDER BY l.datahora DESC
        `;

        const [rows] = await connection.execute(sql);

        return res.status(200).json(rows);
    } catch (error) {
        console.error("Erro ao listar logs:", error);

        return res.status(500).json({
            message: "Erro ao consultar os registros de auditoria."
        });
    }
}


// Registra uma tentativa de login.
export async function registerLoginLog(
    req,
    codigoHttp,
    statusAcao,
    userId = null
) {
    const connection = req.app.locals.db;

    const email =
        typeof req.body?.email === "string"
            ? req.body.email.trim().toLowerCase().slice(0, 254)
            : "não informado";

    await registerLog(connection, {
        usuario: userId,
        acao: "login",
        mensagem: `Tentativa de login: ${email}. Resultado: ${statusAcao}`,
        recurso_afetado: "users",
        id_recurso_afetado:
            userId === null ? null : String(userId),
        valor_antigo: null,
        valor_novo: null,
        campos_alterados: null,
        ip: req.ip,
        codigo_http: codigoHttp,
        status_acao: statusAcao
    });
}
