import { buscarLivrosPorId, buscarview, cadastrarLivro } from "./bibliotecaService.js";
import {pool} from "./config.js";

async function  main(){
    await buscarLivrosPorId(1)
    await buscarview()
    await cadastrarLivro('Teste','Testinho', '10', '1', '10')
}

main(). catch(error =>
    console.error(error)
). finally(async()=>{
    await pool.end();
})