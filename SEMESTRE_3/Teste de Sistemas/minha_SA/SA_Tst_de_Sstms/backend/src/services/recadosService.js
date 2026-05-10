import { pool } from '../config/db.js'

export async function criarRecado({ responsavel, tipo_recado, recado, status }) {

    const query = `
        INSERT INTO quadro_recados (
            responsavel,
            tipo_recado,
            recado,
            status
        )
        VALUES ($1, $2, $3, COALESCE($4, 'ativo'))
        RETURNING *
    `

    const values = [
        responsavel,
        tipo_recado,
        recado,
        status
    ]

    const { rows } = await pool.query(query, values)

    return {
        mensagem: `Recado cadastrado com sucesso! ID do recado: ${rows[0].id}`,
        recado: rows[0]
    }
}// ↪ Criar recado

export async function listarRecados() {

    const query = `
        SELECT qr.*, m.nome AS nome_responsavel
        FROM quadro_recados qr
        JOIN moradores m ON m.id = qr.responsavel
        ORDER BY qr.id
    `

    const { rows } = await pool.query(query)

    return {
        mensagem: 'Aqui está a lista de todos os recados:',
        recados: rows
    }
}// ↪ Listar TODOS recados

export async function buscarRecadoPorId(id) {

    const query = `
        SELECT qr.*, m.nome AS nome_responsavel
        FROM quadro_recados qr
        JOIN moradores m ON m.id = qr.responsavel
        WHERE qr.id = $1
    `

    const { rows } = await pool.query(query, [id])

    if (!rows[0]) {
        return {
            mensagem: `Erro: não existe recado cadastrado com o ID ${id}`
        }
    }

    return {
        mensagem: `Esses são os dados do recado do ID ${id}:`,
        recado: rows[0]
    }
}// ↪ Buscar recado específico

export async function atualizarRecado(
    id,
    { responsavel, tipo_recado, recado, status }
) {

    const query = `
        UPDATE quadro_recados
        SET responsavel = $1,
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

    if (!rows[0]) {
        return {
            mensagem: `Erro: não existe recado cadastrado com o ID ${id}`
        }
    }

    return {
        mensagem: `Recado atualizado com sucesso! ID do recado: ${rows[0].id}`,
        recado: rows[0]
    }
}// ↪ Atualizar recado

export async function deletarRecado(id) {

    const query = `
        DELETE FROM quadro_recados
        WHERE id = $1
        RETURNING *
    `

    const { rows } = await pool.query(query, [id])

    if (!rows[0]) {
        return {
            mensagem: `Erro: não existe recado cadastrado com o ID ${id}`
        }
    }

    return {
        mensagem: `Recado do ID ${id} foi deletado com sucesso!`,
        recado: rows[0]
    }
}// ↪ Deletar recado