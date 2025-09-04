import { useState } from "react"

function Ex(){
    const[pizzaTamnho, setpizzaTamanho]  = useState()

    function pedido(){
        let pizza = prompt(`Qual tamanho você deseja de pizza?
(P) Pequena, (M) Médio ou, (G) Grande`)
        let tamanho
        
        if(pizza === 'P' || pizza === 'p'){
            tamanho = 'O tamanho Pequeno custa: R$25,00 reais.'
            setpizzaTamanho(tamanho)
        } else if(pizza === 'M' || pizza === 'm'){
            tamanho = 'O tamanho Médio custa: R$50,00 reais.'
            setpizzaTamanho(tamanho)
        } else if(pizza === 'G' || pizza === 'g'){
            tamanho = 'O tamanho Grande custa: R$75,00 reais.'
            setpizzaTamanho(tamanho)
        } else if(pizza != ""){
            alert("Tamanho incorreto, peça novamente")
            pedido()
        } else{
            alert("Você esqueceu de informar o tamanho!")
            pedido()
        }

    }

    return (
        <div>

            <div>
                <button onClick={pedido}>Pedir pizza</button>           
            </div>

            <div>
                {pizzaTamnho}            
            </div>

        </div>
        
    )
}
export default Ex