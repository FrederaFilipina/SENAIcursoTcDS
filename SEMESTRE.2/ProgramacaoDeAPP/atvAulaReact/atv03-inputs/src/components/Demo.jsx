import { useState } from 'react'
import './Demo.css'

function Demo(){
    const[inputUsername, setInputUsername]=useState('')
    const[inputSenha, setInputSenha]=useState('')

    function fazerlogin(){
        alert(`Nome: ${inputUsername} e senha: ${inputSenha}`)
    }
    return(
        <div className='container-Demo'>
            <h2>Demo</h2>

            <label htmlFor="">UserName</label>
            <input type='text'
                value={inputUsername}
                onChange={(event) => setInputUsername(event.target.value)}
            />  
            
            <label htmlFor="">Senha</label>
            <input type='password'
                value={inputSenha}
                onChange={(oi) => setInputSenha(oi.target.value)}
            />
            <br></br>
            <button onClick={fazerlogin}>Log in</button>
            
        </div>

    )
}

export default Demo