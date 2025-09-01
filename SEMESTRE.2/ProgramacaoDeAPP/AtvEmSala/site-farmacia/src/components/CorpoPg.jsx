import './CorpoPg.css'
import CorpoPg_Parte1 from './CorpoPg_Parte1'
import CorpoPg_Parte1a from './CorpoPg_Parte1a'
import CorpoPg_Parte2a from './CorpoPg_Parte2a'

function CorpoPg(){
    return(
        
        <div className='Container-CorpoPg'>
            
            <div className='Pg_Parte1'>
                
                <div>
                    <CorpoPg_Parte1a />
                </div>

                <div className='Parte1-msg'>
                    <CorpoPg_Parte1 msg1={"Bem Vindos!"}/>
                </div>

            </div>

            <div className='Pg_Parte2'>
                <div>
                    <CorpoPg_Parte1 msg3={"Bem Vindos!"}/>
                </div>
                <div>
                    <CorpoPg_Parte2a />
                </div>
            </div> 


        </div>

    )
}
export default CorpoPg