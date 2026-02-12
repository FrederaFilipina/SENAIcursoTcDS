import { pool } from "./config.js";

export async function buscarLivrosPorId(livroId) {
    const [rows] = await pool.query('SELECT * FROM livros WHERE ID=?', [livroId])
    console.log(rows)
    return rows[0]
};

export async function buscarView() {
    const [rows] = await pool.query("SELECT * from vw_livros")
    console.log(rows)
    return rows   
};

export async function cadastrarNovoLivro(titulo, categoria, valor_un, estoque_min, estoque_max) {
    const [rows] = await pool.query( 'INSERT INTO livros (titulo, categoria, valor_un, estoque_min, estoque_max) VALUES(?,?,?,?,?)', [titulo, categoria, valor_un, estoque_min, estoque_max])
    console.log(rows)
    return rows
}

export async function livrosMaiorSaidaNoPeriodo(dataInicial, dataFinal) {
    const [rows] = await pool.query(`SELECT l.id AS livro_id, 
        l.titulo AS livro, 
        l.valor_un, 
        m.quantidade_total_saida 
        FROM livros l 
        LEFT JOIN 
        ( SELECT livro_id, SUM(quantidade) AS quantidade_total_saida 
         FROM movimentacoes 
         WHERE tipo = 'SAIDA' 
         AND data_movimentacao 
         BETWEEN ? AND ? 
         GROUP BY livro_id ) m ON m.livro_id = l.id 
         ORDER BY m.quantidade_total_saida DESC`,
        [dataInicial, dataFinal]);
    return rows.map((item) => {
        const quantidade = item.quantidade_total_saida; 
        const valorUnitario = item.valor_unitario;
        return { 
            livro: item.livro, 
            quantidade_total_saida: quantidade, 
            valor_total_financeiro_saidas: quantidade * valorUnitario 
        };
    });
} 