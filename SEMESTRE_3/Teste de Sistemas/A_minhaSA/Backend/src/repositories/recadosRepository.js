import { pool } from '../config/db.js'


export async function criarRecado({
    responsavel,
    tipo_recado,
    recado,
    status
}) {

    const query = `
        INSERT INTO recados (
            responsavel,
            tipo_recado,
            recado,
            status
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `

    const values = [
        responsavel,
        tipo_recado,
        recado,
        status
    ]

    const { rows } = await pool.query(query, values)

    return rows[0]
}//↪ Criar um recado


export async function listarRecados() {

    const query = `
        SELECT *
        FROM recados
        ORDER BY criado DESC
    `

    const { rows } = await pool.query(query)

    return rows
}//↪ Ler todos os recados


export async function buscarRecadoPorId(id) {

    const query = `
        SELECT *
        FROM recados
        WHERE id = $1
    `

    const values = [id]

    const { rows } = await pool.query(query, values)

    return rows[0]
}//↪ Ler um único recado


export async function atualizarRecado(
    id,
    {
        responsavel,
        tipo_recado,
        recado,
        status
    }
) {

    const query = `
        UPDATE recados
        SET
            responsavel = $1,
            tipo_recado = $2,
            recado = $3,
            status = $4
        WHERE id = $5
        RETURNING *
    `

    const values = [
        responsavel,
        tipo_recado,
        recado,
        status,
        id
    ]

    const { rows } = await pool.query(query, values)

    return rows[0]
}//↪ Atualizar um único recado


export async function deletarRecado(id) {

    const query = `
        DELETE FROM recados
        WHERE id = $1
        RETURNING *
    `

    const values = [id]

    const { rows } = await pool.query(query, values)

    return rows[0]
}//↪ Deletar um único recado