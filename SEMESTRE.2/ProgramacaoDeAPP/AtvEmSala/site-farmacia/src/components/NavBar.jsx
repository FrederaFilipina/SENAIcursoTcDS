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
                        <button className='Icons-bttn'>
                            <img src='./Imgs/icon_home.svg' className='Icons-icon'></img>
                        </button>
                        <h1>home</h1>
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