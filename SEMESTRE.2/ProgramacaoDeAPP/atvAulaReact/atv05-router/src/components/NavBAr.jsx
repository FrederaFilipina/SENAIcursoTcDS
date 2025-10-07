import { Link } from "react-router-dom"
import './NavBAr.css'

function NavBar(){
    return(
        <nav className="NavBar">
            <Link to='/'> Home Page </Link>
            <Link to='/pag1'> Página 1 </Link>
            <Link to='/pag2'> Página 2 </Link>
            <Link to='/pag3'> Página 3 </Link>
            <Link to='/produtos'> Produtos </Link>
        </nav>
    )
}
export default NavBar