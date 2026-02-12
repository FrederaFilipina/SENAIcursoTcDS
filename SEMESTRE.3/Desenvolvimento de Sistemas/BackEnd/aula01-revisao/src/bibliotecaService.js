import {pool} from "./config.js";

export async function buscarLivrosPorId(livroId) {
    const [rows] = await pool.query("SELECT * from livros WHERE id=?", [livroId])
    console.log(rows)
    return rows[0]
}