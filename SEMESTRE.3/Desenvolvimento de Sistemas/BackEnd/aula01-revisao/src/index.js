import { buscarLivrosPorId } from "./bibliotecaService.js";
import {pool} from "./config.js";

async function  main(){
    await buscarLivrosPorId(1)
}
main(). catch(error =>
    console.error(error)
). finally(async()=>{
    await pool.end();
})