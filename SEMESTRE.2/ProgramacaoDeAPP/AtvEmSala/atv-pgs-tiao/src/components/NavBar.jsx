import { Link } from "react-router-dom"

function NavBar(){
    return( 
        <nav style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '50px'}}>
            <Link to='/'> Home</Link>
            <Link to='/barzinho'> Barzinho</Link>
            <Link to='/borracharia'>Borracharia</Link>
            <Link to='/sorveteria'>Sorveteria</Link>
            <Link to='/fiado'>Fiado</Link>
        </nav>
    )
}
export default NavBar
