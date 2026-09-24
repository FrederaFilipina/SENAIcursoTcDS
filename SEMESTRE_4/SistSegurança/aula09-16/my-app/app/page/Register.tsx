"use client"

import { register } from "../services/register"
import { useState } from "react"
import { errorMessage } from "../services/api"


export default function Register(){

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    async function submit(event: any){
        event.preventDefault()

        setError("")
        try {
            const result = await register(name, email, password)

            console.log("Menssagem:", result.message)
        } catch (error) {
            setError(errorMessage(error))
        }
        
    }
    return(
        <>
        <h1>Registrar usuário</h1>
        <form onSubmit={submit}>
            <div>
                <label htmlFor="name">Nome</label>
                <input type="text" id="name" name="name" required value={name}
                onChange={e => setName(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="email">E-mail</label>
                <input type="text" id="email" name="email" required value={email}
                onChange={e => setEmail(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="text" id="password" name="password" required value={password}
                onChange={e => setPassword(e.target.value)}/>
            </div>

            <button type="submit">Cadastrar</button>
        </form>
        </>
    )
}