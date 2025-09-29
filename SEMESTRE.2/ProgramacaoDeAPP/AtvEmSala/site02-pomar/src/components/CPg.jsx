import { useState } from 'react'
import Produtos from './produtos'

function CPg(){
    
    const[telaProds, setTelaProds]=useState('')

    function iniciarCompras(){
        if(true){
            setTelaProds(<Produtos />)
        }
    }
    



    return(
        <div>
            <button onClick={iniciarCompras}>
                Iniciar....
            </button>

            <p>{telaProds}</p>
        </div>

    )
}
export default CPg