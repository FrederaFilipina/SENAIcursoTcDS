import { pool } from '../config/db.js'


export async function buscarUsuario(usuario) {

    const query = `
        SELECT *
        FROM moradores
        WHERE usuario = $1
    `

    const values = [usuario]
    const { rows } = await pool.query(query, values)

    return rows[0]
}