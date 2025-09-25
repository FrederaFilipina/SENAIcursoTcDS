import BttnsSetList from './BttnsSetList'
import './CPg_Armor_Menu.css'

function CPg_Armor_Menu() {
    return (
        <div className='Armor-Menu'>
            <div className='Menu-Tipo'>
                <BttnsSetList setlist={'Light'}/>
                <BttnsSetList setlist={'Medium'}/>
                <BttnsSetList setlist={'Heavy'}/>
                <BttnsSetList setlist={'All'}/>
            </div>
            <div className='Menu-Bonus'>
                <BttnsSetList setlist={'Agility Weapon Damage'} direcao={'horizontal'}/>
            </div>
        </div>
    )
}
export default CPg_Armor_Menu