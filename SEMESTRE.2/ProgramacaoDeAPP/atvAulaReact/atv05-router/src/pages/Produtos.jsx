import { useContext } from "react"
import NavBar from "../components/NavBar"
import { GlobalContext } from "../contexts/GlobalContext"


function Produtos(){
    const{produto, produtos} = useContext(GlobalContext)
    return(
        <div>
            <NavBar />
            <h1>Produtos</h1>
            <p>{produto}</p>
            <p>{produtos}</p>
        </div>
    )
}
export default Produtos