import { useContext } from "react"
import NavBar from "../components/NavBar"
import { Produtos } from "../contexts/Produtos"

function Borracharia (){
    const{servBorracharia} = useContext(Produtos)
    return(
        <div>
            <NavBar />
            <h3>Borracharia</h3>

            {servBorracharia.map((prod) => (
                <p key={prod.id}>
                    {prod.nome}
                </p>
            ))}            

        </div>
    )
}

export default Borracharia