import { useState } from 'react'
import './App.css'

function App() {
  const [pessoas, setPessoas] = useState(
    [
    { id: 1, nome: "Maria", idade: 90 },
    { id: 2, nome: "João", idade: 20 },
    { id: 3, nome: "Joana", idade: 50 },
    { id: 4, nome: "Maria", idade: 90 },
    { id: 5, nome: "João", idade: 20 },
    { id: 6, nome: "Joana", idade: 50 },
    { id: 7, nome: "Maria", idade: 90 },
    { id: 8, nome: "João", idade: 20 },
    { id: 9, nome: "Joana", idade: 50 },
    { id: 10, nome: "Joana", idade: 50 }
  ]
  )

  function cadastrar(){
    let pessoa ={
      id: Date.now(),
      nome: prompt("Nome: "),
      idade: Number(prompt("Idade: ")),
    }

    setPessoas([pessoa, ...pessoas])
  }

  return (
    <div>
      <h1>Arrays</h1>
      <button onClick={cadastrar}>Cadastrar</button>
      <div className="formCadastro">
        <input type="text" />
        <input type="text" />
      </div>
      <div className='container-card'>
        {pessoas.map((pessoa) => (

          <div key={pessoa.id} className='card-pessoa'>
            <h4>{pessoa.nome}</h4>
            <p>{pessoa.idade} anos</p>
          </div>

        ))}
      </div>
    </div>
  )
}

export default App
