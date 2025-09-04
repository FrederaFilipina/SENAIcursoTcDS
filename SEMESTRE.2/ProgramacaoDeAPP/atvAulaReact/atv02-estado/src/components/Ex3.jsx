import { useState } from "react"
import './Ex3.css'

function Ex3(){
    const[prodVlr, setprodVlr] = useState()
    const[porqValor, setporqValor] = useState()

    function vlrProd(){
        let valorProduto = Number(prompt("Qual é o valor do brinquedo: "))
        setprodVlr(valorProduto)

        let moeda1 = (Math.floor(Math.random() * (10 - 1)) + 1) * 1
        let moeda50 = (Math.floor(Math.random() * (20 - 1)) + 1) * 0.5
        let moeda25 = (Math.floor(Math.random() * (40 - 1)) + 1) * 0.25
        let moeda10 = (Math.floor(Math.random() * (80 - 1)) + 1) * 0.10
        let moeda5 = (Math.floor(Math.random() * (160 - 1)) + 1) * 0.5
        let moedaTotal = moeda1 + moeda50 + moeda25 + moeda10 + moeda5

        setporqValor(moedaTotal)
    }


    return(
        <div className="Ex3">
            <p>Ex 5.25 </p>
            <button onClick={vlrProd}>R$ do Brinquedo</button>

            {prodVlr && 
                <>
                    {prodVlr < porqValor ?
                    <p>Valor do porquinho: {porqValor}, vamos efetuar a compra!</p>
                    : <p>Escolha outro brinquedo</p>}
                </>
            }
                 
        </div>
    )
}
export default Ex3