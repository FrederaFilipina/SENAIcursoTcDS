import { pool } from '../config/db.js'

export async function login({ usuario, senha }) {

    if (!usuario || !senha) {
        throw new Error('Usuário e senha são obrigatórios')
    }

    const query = `
        SELECT *
        FROM moradores
        WHERE usuario = $1
    `

    const { rows } = await pool.query(query, [usuario])

    if (rows.length === 0) {
        throw new Error('Usuário não encontrado')
    }

    const morador = rows[0]

    if (morador.senha !== senha) {
        throw new Error('Senha inválida')
    }

    return {
        mensagem: 'Login realizado com sucesso',
        morador: {
            id: morador.id,
            nome: morador.nome,
            bloco: morador.bloco,
            num_ap: morador.num_ap,
            usuario: morador.usuario
        }
    }
}