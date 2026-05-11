import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
    getMoradores,
    setUsuarioLogado
} from '../services/localStorage'

function Login() {

    const navigate = useNavigate()

    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')

    function fazerLogin(e) {

        e.preventDefault()

        const moradores = getMoradores()

        const morador = moradores.find(
            (m) =>
                m.usuario === usuario &&
                m.senha === senha
        )

        if (!morador) {
            alert('Usuário ou senha inválidos')
            return
        }

        setUsuarioLogado(morador)

        navigate('/home')
    }

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <form
                onSubmit={fazerLogin}
                className="bg-white p-8 rounded-xl shadow-md w-96"
            >

                <h1 className="text-2xl font-bold mb-6 text-center">
                    Login
                </h1>

                <input
                    type="text"
                    placeholder="Usuário"
                    className="w-full border p-3 rounded mb-4"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Senha"
                    className="w-full border p-3 rounded mb-4"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />

                <button
                    className="w-full bg-blue-600 text-white p-3 rounded"
                >
                    Entrar
                </button>

            </form>

        </div>
    )
}

export default Login