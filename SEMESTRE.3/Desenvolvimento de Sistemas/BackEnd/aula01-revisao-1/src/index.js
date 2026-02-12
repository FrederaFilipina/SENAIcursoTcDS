import { buscarLivrosPorId, buscarView, cadastrarNovoLivro } from "./bbtcsService.js";
import { pool } from "./config.js";

// async function main() {
//     await buscarLivrosPorId(3)
//     await buscarView()
//     await cadastrarNovoLivro ('Teste','Testinho', '75.25', '1', '10')
// }

async function main() {
    console.log(await buscarLivrosPorId(1))

    const dataInicial = "2026-01-01 00:00:00";
    const dataFinal = "2026-12-31 23:59:59";
    console.log(await livrosMaiorSaidaNoPeriodo(dataInicial, dataFinal))
}

main(). catch(error =>
    console.error(error)
). finally(async()=>{
    await pool.end()
});