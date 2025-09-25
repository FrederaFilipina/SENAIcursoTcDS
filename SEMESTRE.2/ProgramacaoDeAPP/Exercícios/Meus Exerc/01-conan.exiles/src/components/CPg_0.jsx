import './CPg_0.css'
import CorpoPg_Armor from './CPg_Armor'
import CorpoPg_Building from './CPg_Building'
import CorpoPg_Weapons from './CPg_Weapons'


function CorpoPg_0({paginaNome}){
    
    function MostrarPg(){

        if(paginaNome === 'Armor'){   
            return(
                <CorpoPg_Armor />
            )
        }
        else if(paginaNome === 'Building'){
            return(
                <CorpoPg_Building />
            )
        }
        else if(paginaNome === 'Weapons'){
            return(
                <CorpoPg_Weapons />
            )
        }
        else{
            return(
                <h1>Cliquem em algum dos ícones</h1>
            )
        }
    }


    return(
        <>{MostrarPg()}</>
    )
}
export default CorpoPg_0