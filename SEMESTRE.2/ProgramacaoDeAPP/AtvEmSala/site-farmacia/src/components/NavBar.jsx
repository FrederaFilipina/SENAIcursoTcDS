import Icon1_Endereco from './Icon1_Endereco'
import Icon2_Home from './Icon2_Home'
import Icon3_Produtos from './Icon3_Produtos'
import Icon4_Compras from './Icon4_Compras'
import './NavBar.css'

function NavBar(){
    return(
        <div className='Container-NavBar'>

            <div className='NavBar-nome_icons'>

                <div className='NavBar-nome'>
                    <h1>F</h1>
                    <h1>A</h1>
                    <h1>R</h1>
                    <h1>_</h1>
                    <h1>M</h1>
                    <h1>Á</h1>
                    <h1>R</h1>
                    <h1>C</h1>
                    <h1>I</h1>
                    <h1>A</h1>
                </div>
                
                <div className='NavBar-menu'>

                    <div className='Menu-icons'>
                        <Icon1_Endereco />
                        <Icon2_Home />
                        <Icon3_Produtos />     
                        <Icon4_Compras />                   
                    </div>

                </div>

            </div>

            <div className='Nome-placa'>
                <img src='./Imgs/placa.png' className='PlacaNavbar'></img>
            </div>

        </div>
    )
}
export default NavBar