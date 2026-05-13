import { pool } from '../config/db.js'


export async function criarMorador({
    nome,
    bloco,
    num_ap,
    usuario,
    senha
}) {
    const query = `
        INSERT INTO moradores (
            nome,
            bloco,
            num_ap,
            usuario,
            senha
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `

    const values = [
        nome,
        bloco,
        num_ap,
        usuario,
        senha
    ]

    const { rows } = await pool.query(query, values)
    return rows[0]
}//↪ Criar usuário de morador


export async function listarMoradores() {
    const query = `
        SELECT
            id,
            nome,
            bloco,
            num_ap,
            usuario
        FROM moradores
        ORDER BY id ASC
    `

    const { rows } = await pool.query(query)
    return rows
}//↪ Ler todo os usuários criados


export async function buscarMoradorPorId(id) {
    const query = `
        SELECT
            id,
            nome,
            bloco,
            num_ap,
            usuario
        FROM moradores
        WHERE id = $1
    `

    const values = [id]

    const { rows } = await pool.query(query, values)
    return rows[0]
}//↪ Ler um único usuário


export async function atualizarMorador(
    id,
    {
        nome,
        bloco,
        num_ap,
        usuario,
        senha
    }
) {

    const query = `
        UPDATE moradores
        SET
            nome = $1,
            bloco = $2,
            num_ap = $3,
            usuario = $4,
            senha = $5
        WHERE id = $6
        RETURNING *
    `

    const values = [
        nome,
        bloco,
        num_ap,
        usuario,
        senha,
        id
    ]

    const { rows } = await pool.query(query, values)
    return rows[0]
}//↪ Atualizar os dados de um único usuário


export async function deletarMorador(id) {
    const query = `
        DELETE FROM moradores
        WHERE id = $1
        RETURNING *
    `

    const values = [id]

    const { rows } = await pool.query(query, values)
    return rows[0]
}//↪ Deletar o úsuario de um único modador