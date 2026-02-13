import {pool} from "./config.js";

export async function buscarView() {
    const [rows] = await pool.query("SELECT * FROM vw_estoque")
    console.log(rows)
    return rows   
};

export async function consultarProds(matLimpzaId) {
    const [rows] = await pool.query('SELECT * FROM matLimpeza', matLimpzaId)
    console.log(rows)
    return rows[0]  
};

export async function cadastrarProd(nome, categoria, valor_un, estoque_min, estoque_max) {
    const [rows] = await pool.query(
        'INSERT INTO matLimpeza (nome, categoria, valor_un, estoque_min, estoque_max) VALUE (?,?,?,?,?)', [nome, categoria, valor_un, estoque_min, estoque_max])
        console.log(rows)
        return rows    
}


export async function lstSaidaProsOrdemDecr() {
    const [rows] = await pool.query(`SELECT * FROM movEstoque
WHERE tipo_mov = 'Saída' ORDER BY movEstoque.data_mov`, );
    console.log(rows)
        return rows
};