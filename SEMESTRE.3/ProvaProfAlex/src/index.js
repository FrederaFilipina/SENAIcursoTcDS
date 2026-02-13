import { buscarView, cadastrarProd, consultarProds, lstSaidaProsOrdemDecr, } from "./almox_ind.js";
import {pool} from "./config.js";

async function  main(){
    // await buscarView()
    // await consultarProds(0)
    // await cadastrarProd ('Sabão Lqd - Amarelo', 'Cozinha', '5.50', '25', '100')
    // await consultarProds(0)
    await lstSaidaProsOrdemDecr()
}

main(). catch(error =>
    console.error(error)
). finally(async()=>{
    await pool.end();
})