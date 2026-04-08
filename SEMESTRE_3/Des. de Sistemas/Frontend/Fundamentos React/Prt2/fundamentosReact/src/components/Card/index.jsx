import styles from './Card.module.css'

const Card = ({nome, idade, cidade}) => {
    return(
        <div className={styles.card}>
            <h3>Nome: {nome}</h3>
            <h4>Idade: {idade}</h4>
            <h4>Cidade:{cidade}</h4>
        </div>
    )
}

export default Card