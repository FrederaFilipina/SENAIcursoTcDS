import { useState } from 'react'

function Aula() {
    const[numero, setNumero] = useState(0)
      function incrementar(){
        setNumero(numero + 1)
      }
      function decrementar(){
        setNumero(numero -1)
      }
  
    const[username, setUserName] = useState()
      function logar(){
        let nome = prompt("Digite seu nome:")
        setUserName(nome)
      }
  
  
  
    return (
        <div>
            {/* {username && <p>render condicional</p>} */}
            {username && <p className='user'> Bem vindo {username}</p>}
            <button onClick={logar}>Logar</button>

            <h1>Estados</h1>

            <button onClick={decrementar}>-</button>
            {numero}
            <button onClick={incrementar}>+</button>
        </div>
    )
  }
export default Aula