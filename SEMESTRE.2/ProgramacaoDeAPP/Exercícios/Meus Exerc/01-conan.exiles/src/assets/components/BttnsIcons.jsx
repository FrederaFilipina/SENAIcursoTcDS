import './BttnsIcons.css'

function BttnsIcons(props){
    function PgNome(){
        const[pagina, setPgNome] = useState()
    }


    return(
        
        <button onClick={PgNome} className="BttnsIcons">
            <p className='txt'>{props.bttns}</p>
            <img src={props.icon} className='Icons'></img>
        </button>
    )
}
export default BttnsIcons