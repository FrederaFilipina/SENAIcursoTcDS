import BttnsIcons from './BttnsIcons'
import './MenuInicial_0.css'

function MenuInicial_0 ({paginaNome, setPgNome}){

    return(

        <div className='Cont-MenuInical'>

            <div className='Cont-Nome'>
                <h1>Conan</h1>
                <h2>Exiles</h2>
            </div>

            <div className='Cont-NavBar'>

                <div className='NavBar-Icons'>
                    <BttnsIcons funcao={()=> setPgNome('Armor')} nomepg={"Armor"} icon={'Icons/iconArmor.svg'}/>
                    <BttnsIcons funcao={()=> setPgNome('Building')} nomepg={"Building"} icon={'Icons/iconBuild.svg'}/>
                    <BttnsIcons funcao={()=> setPgNome('Weapons')} nomepg={"Weapons"}icon={'Icons/iconWeapon.svg'}/>
                </div>

                <div className='NavBar-Nome'>
                    <h2>{paginaNome}</h2>
                </div>

            </div>

        </div>
    )
}
export default MenuInicial_0