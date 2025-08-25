import './Pizzas.css'

function Pizzas (props){
    return(
        <div className='Pizzas-container'>
            <p>{props.pizzaP}</p>
            <p>{props.pizzaM}</p>
            <p>{props.pizzaG}</p>
            
        </div>
    )
}
export default Pizzas