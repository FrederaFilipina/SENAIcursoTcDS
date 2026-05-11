import { pool } from '../config/db.js'


function validarBloco(bloco) {
    if (bloco !== 'A' && bloco !== 'B') {
        throw new Error("O bloco deve ser apenas 'A' ou 'B'")
    }
}

function validarApartamento(num_ap) {
    const regexApartamento = /^[1-5]0[1-8]$/

    if (!regexApartamento.test(num_ap)) {
        throw new Error(
            "O número do apartamento deve seguir o padrão: [1-5]0[1-8]. Ex: 101, 208, 501"
        )
    }
}

export async function criarMorador({ nome, bloco, num_ap, usuario, senha }) {

    if (!nome || !bloco || !num_ap || !usuario || !senha) {
        throw new Error('Todos os campos são obrigatórios')
    }

    validarBloco(bloco)
    validarApartamento(num_ap)

    const verificarUsuario = `
        SELECT id
        FROM moradores
        WHERE usuario = $1
    `

    const usuarioExistente = await pool.query(verificarUsuario, [usuario])

    if (usuarioExistente.rows.length > 0) {
        throw new Error('Este usuário já está cadastrado')
    }

    const query = `
        INSERT INTO moradores (
            nome,
            bloco,
            num_ap,
            usuario,
            senha
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, nome, bloco, num_ap, usuario
    `

    const values = [
        nome,
        bloco,
        num_ap,
        usuario,
        senha
    ]

    const { rows } = await pool.query(query, values)

    return {
        mensagem: `Morador cadastrado com sucesso! ID do cadastro: ${rows[0].id}`,
        morador: rows[0]
    }
}// ↪ Criar morador


export async function listarMoradores() {

    const query = `
        SELECT *
        FROM moradores
        ORDER BY id
    `

    const { rows } = await pool.query(query)

    return {
        mensagem: 'Aqui está a lista de todos os moradores:',
        moradores: rows
    }
}// ↪ Listar TODOS os moradores


export async function buscarMoradorPorId(id) {

    const query = `
        SELECT *
        FROM moradores
        WHERE id = $1
    `

    const { rows } = await pool.query(query, [id])

    if (rows.length === 0) {
        return null
    }

    return {
        mensagem: `Esses são os dados do morador do ID ${id}:`,
        morador: rows[0]
    }
}// ↪ Buscar morador específico


export async function atualizarMorador(id, { nome, bloco, num_ap }) {

    if (!nome || !bloco || !num_ap) {
        throw new Error('Todos os campos são obrigatórios')
    }

    validarBloco(bloco)
    validarApartamento(num_ap)

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

    if (rows.length === 0) {
        return null
    }

    return {
        mensagem: `Morador atualizado com sucesso! ID do cadastro: ${rows[0].id}`,
        morador: rows[0]
    }
}// ↪ Atualizar dados morador


export async function deletarMorador(id) {

    const query = `
        DELETE FROM moradores
        WHERE id = $1
        RETURNING *
    `

    const { rows } = await pool.query(query, [id])

    if (rows.length === 0) {
        return null
    }

    return {
        mensagem: `Morador do ID ${id} foi deletado com sucesso!`,
        morador: rows[0]
    }
}// ↪ Deletar morador