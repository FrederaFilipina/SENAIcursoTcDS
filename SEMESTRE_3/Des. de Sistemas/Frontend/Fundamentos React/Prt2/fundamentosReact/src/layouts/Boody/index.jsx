import Card from "../../components/Card"
import styles from "./Boody.module.css"

const Body = () => {

  const usuarios =[
    {nome:"Testinho", idade: 12, cidade:"Testolandia"},
    {nome:"Teste", idade: 25, cidade:"Testadolandia"},
    {nome:"Testão", idade: 50, cidade:"Testadinho"}
  ]

  return (
    <>
    <main className={styles.body}>
      <h1> Usuários Cadastrados </h1>
      <div className={styles.cardContainer}>
        {usuarios.map((usuarios, index) =>(
          <Card
          key={index}
          nome={usuarios.nome}
          idade={usuarios.idade}
          cidade={usuarios.cidade}/>
        ))}
      </div>
    </main>
    </>
  )
}

export default Body
