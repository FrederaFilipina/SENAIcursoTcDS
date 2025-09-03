import { useState } from "react"

function Ex1(){
    const[prcVenda, setprcVeda] = useState()

    function CalularPrc(){
        let prc = Number(prompt("Preço de compra: "))
        if(prc < 20){
            setprcVeda(prc * 1.45)
        } else{
            setprcVeda(prc * 1.3)
        }
    }

    return(
        <div>
            <p>Ex 5.23 - Venda</p>
            <button onClick={CalularPrc}>Calcular</button>
            {/* {prcVenda && <p>Preço de venda: R${prcVenda}</p>} */}

            {prcVenda ? <p>Preço de venda: R${prcVenda}</p> :<p>Informe o preço de compra</p> }
        </div>
    )
}
export default Ex1