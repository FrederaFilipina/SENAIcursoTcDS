import BttnsIcons from './BttnsIcons'
import './MenuInicial_0.css'

function MenuInicial_0 (){
    return(

        <div className='Cont-MenuInical'>

            <div className='Cont-Nome'>
                <h1>Conan</h1>
                <h2>Exiles</h2>
            </div>

            <div className='Cont-NavBar'>

                <div className='NavBar-Icons'>
                    <BttnsIcons icon={'Icons/iconArmor.svg'} bttns={"Armor"} />
                    <BttnsIcons icon={'Icons/iconBuild.svg'} bttns={"Building"}/>
                    <BttnsIcons icon={'Icons/iconWeapon.svg'} bttns={"Weapons"}/>
                </div>

                <div className='NavBar-Nome'>
                    <h1>Nome da Página</h1>
                </div>

            </div>

        </div>
    )
}
export default MenuInicial_0