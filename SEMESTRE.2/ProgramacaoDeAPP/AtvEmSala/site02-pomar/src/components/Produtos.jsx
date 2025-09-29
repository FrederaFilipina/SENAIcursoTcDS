import { useState } from "react"
import Frutas from "./Frutas"

function Produtos (){
    const[unMaca, setUnMaca] = useState(0)
    const[unLaranja, setUnLaranja] = useState(0)
    const[unBergamota, setUnBergamota] = useState(0)
    const[unBanana, setUnBanana] = useState(0)
    const[unPera, setUnPera] = useState(0)

    function aumentar(){
        setUnMaca(unMaca + 1)
        setUnLaranja(unLaranja + 1)
    }
    function diminuir(){
        setUnMaca(unMaca - 1)
        setUnLaranja(unLaranja - 1)
    }



    return(
        <div>
            <Frutas frutas={'Maçã'} valor={'R$ 1,50'}/>
            <p>Unidades: {unMaca}</p>
            <button onClick={aumentar}> + </button>
            <button onClick={diminuir}> - </button>
            <br></br>
            <Frutas frutas={'Laranja'} valor={'R$ 2,00'}/>
            <p>Unidades: {unLaranja}</p>
            <br></br>
            <Frutas frutas={'Bergamota'} valor={'R$ 1,00'}/>
            <p>Unidades: {unBergamota}</p>
            <br></br>
            <Frutas frutas={'Banana'} valor={'R$ 1,20'}/>
            <p>Unidades: {unBanana}</p>
            <br></br>
            <Frutas frutas={'Pera'} valor={'R$ 0,50'}/>
            <p>Unidades: {unPera}</p>
            <br></br>
        </div>
    )
}
export default Produtos