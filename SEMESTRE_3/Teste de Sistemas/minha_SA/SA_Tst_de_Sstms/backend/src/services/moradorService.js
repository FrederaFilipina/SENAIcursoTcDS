import { pool } from '../config/db.js'



export async function criarMorador({ nome, bloco, num_ap }) {
    const query = `
        INSERT INTO moradores (nome, bloco, num_ap)
        VALUES ($1, $2, $3)
        RETURNING *
    `
    const values = [nome, bloco, num_ap]

    const { rows } = await pool.query(query, values)
    return rows[0]
}// ↪ Criar morador

export async function listarMoradores() {
    const query = `SELECT * FROM moradores ORDER BY id`
    const { rows } = await pool.query(query)

    return rows
}// ↪ Listar TODOS os moradores

export async function buscarMoradorPorId(id) {
    const query = `SELECT * FROM moradores WHERE id = $1`
    const { rows } = await pool.query(query, [id])

    return rows[0] || null
}// ↪ Buscar morador específico

export async function atualizarMorador(id, { nome, bloco, num_ap }) {
    const query = `
        UPDATE moradores
        SET nome = $1,
            bloco = $2,
            num_ap = $3
        WHERE id = $4
        RETURNING *
    `
    const values = [nome, bloco, num_ap, id]

    const { rows } = await pool.query(query, values)

    return rows[0] || null
}// ↪ Atualizar dados morador

export async function deletarMorador(id) {
    const query = `
        DELETE FROM moradores
        WHERE id = $1
        RETURNING *
    `
    const { rows } = await pool.query(query, [id])

    return rows[0] || null
}// ↪ Deletar morador