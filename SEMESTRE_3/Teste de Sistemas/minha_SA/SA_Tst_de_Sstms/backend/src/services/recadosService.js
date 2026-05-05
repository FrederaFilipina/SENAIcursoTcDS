import { pool } from '../config/db.js'

export async function criarRecado({ responsavel, tipo_recado, recado, status }) {
    const query = `
        INSERT INTO quadro_recados (responsavel, tipo_recado, recado, status)
        VALUES ($1, $2, $3, COALESCE($4, 'ativo'))
        RETURNING *
    `
    const values = [responsavel, tipo_recado, recado, status]

    const { rows } = await pool.query(query, values)
    return rows[0]
}// ↪ Criar recado

export async function listarRecados() {
    const query = `
        SELECT qr.*, m.nome AS nome_responsavel
        FROM quadro_recados qr
        JOIN moradores m ON m.id = qr.responsavel
        ORDER BY qr.id
    `
    const { rows } = await pool.query(query)
    return rows
}// ↪ Listar TODOS recados

export async function buscarRecadoPorId(id) {
    const query = `
        SELECT qr.*, m.nome AS nome_responsavel
        FROM quadro_recados qr
        JOIN moradores m ON m.id = qr.responsavel
        WHERE qr.id = $1
    `
    const { rows } = await pool.query(query, [id])

    return rows[0] || null
}// ↪ Buscar recado específico

export async function atualizarRecado(id, { responsavel, tipo_recado, recado, status }) {
    const query = `
        UPDATE quadro_recados
        SET responsavel = $1,
            tipo_recado = $2,
            recado = $3,
            status = $4
        WHERE id = $5
        RETURNING *
    `
    const values = [responsavel, tipo_recado, recado, status, id]

    const { rows } = await pool.query(query, values)
    return rows[0] || null
}// ↪ Atualizar recado

export async function deletarRecado(id) {
    const query = `
        DELETE FROM quadro_recados
        WHERE id = $1
        RETURNING *
    `
    const { rows } = await pool.query(query, [id])

    return rows[0] || null
}// ↪ Deletar recado