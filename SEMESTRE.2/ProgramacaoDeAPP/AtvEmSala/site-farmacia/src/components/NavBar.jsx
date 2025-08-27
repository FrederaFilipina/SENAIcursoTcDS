import './NavBar.css'

function NavBar(){
    return(
        <div className='NavBar-containerPai'>
            <div className='NavBar-contTitulo'>
                <div className='NavBar-Nome'>
                    <h1>F A R _ M Á R C I A</h1>
                </div>
                <div className='NavBar-logoP'>
                    <img src='./Imgs/logoP.PNG' alt='' className='logop'></img>
                </div>
                
                
            </div>

            <div className='NavBar-contBttns'>
                <button className='bttns-icon'>
                    <img src='./Imgs/icon_home.svg' alt='' className='logop'></img>
                </button>
                <button className='bttns-icon'>
                    <img src='./Imgs/icon_prods.svg' alt='' className='logop'></img>
                </button>
                <button className='bttns-icon'>
                    <img src='./Imgs/icon_pedidos.svg' alt='' className='logop'></img>
                </button>
            </div>
        </div>
    )
}
export default NavBar