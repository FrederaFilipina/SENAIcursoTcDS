import {pool} from "./config.js";

export async function buscarLivrosPorId(livroId) {
    const [rows] = await pool.query("SELECT * from livros WHERE id=?", [livroId])
    console.log(rows)
    return rows[0]
};

export async function buscarview() {
    const [rows] = await pool.query("SELECT * from vw_livros")
    console.log(rows)
    return rows    
};

export async function cadastrarLivro(titulo, categoria, valor_unitario, estoque_minimo, estoque_maximo) {
    const [rows] = await pool.query( 'INSERT INTO livros (titulo, categoria, valor_unitario, estoque_minimo, estoque_maximo) VALUES(?,?,?,?,?)', [titulo, categoria, valor_unitario, estoque_minimo, estoque_maximo])
    console.log(rows)
    return rows
}

export async function livrosMaiorSaida() {
    comst [rows] = await pool.query
    console.log(rows)
    return rows
}