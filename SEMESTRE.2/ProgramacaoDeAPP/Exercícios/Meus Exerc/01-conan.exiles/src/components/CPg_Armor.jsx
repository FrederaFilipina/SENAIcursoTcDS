import './CPg_Armor.css'
import CPg_Armor_Menu from './CPg_Armor_Menu'

function CorpoPg_Armor(){
    return(
        <div>
            <div className="Cont-Armor">

                <div className="Armor-MenuSetList">
                    <CPg_Armor_Menu />

                    <div className='Armor-SetList'>
                        <h1>Array dos Sets</h1>
                    </div>
                </div>
                <div className="Armor-SetFinal">
                    <p>Lado Dir.</p>
                    <p>Lado Dir.</p>
                </div>

            </div>
        </div>
    )
}
export default CorpoPg_Armor