import './BttnsSetList.css'

function BttnsSetList(props){
    const estilo = {
        'display': 'flex',
        'flex-direction': 'column',
    }

    if(props.direcao == 'horizontal'){
        estilo['flex-direction'] = 'row-reverse'

    }
    return(

       <div className='checkbox' style={estilo}>
            <label htmlFor=''>{props.setlist}</label>
            <input type='checkbox'/>
       </div>
    )
}
export default BttnsSetList