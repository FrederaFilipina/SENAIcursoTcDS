import './BttnsIcons.css'

function BttnsIcons(props){
    
    return(
        <button onClick={props.funcao} className="BttnsIcons">
            <p className='txt'>{props.nomepg}</p>
            <img src={props.icon} className='Icons'></img>
        </button>
    )
}
export default BttnsIcons

