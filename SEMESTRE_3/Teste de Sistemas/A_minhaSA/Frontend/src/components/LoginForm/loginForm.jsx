import { useState } from 'react'
import minhaSA from '../../service/minhaSA'

function LoginForm() {

    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')

    async function handleLogin(e) {

        e.preventDefault()

        const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios')) || []
        const usuarioEncontrado = usuariosSalvos.find(
            u => u.usuario === usuario && u.senha === senha
        )

        if (!usuarioEncontrado) {
            alert('Usuário ou senha inválidos')
            return
        }

        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado))
        alert('Login realizado com sucesso')
    }

    return (

        <div className="bg-white p-8 rounded-2xl shadow-lg w-80">

            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Login
            </h2>

            <form
                onSubmit={handleLogin}
                className="flex flex-col gap-4"
            >

                <input
                    type="text"
                    placeholder="Usuário"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    className="border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500"
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500"
                />

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                >
                    Entrar
                </button>

            </form>

        </div>
    )
}

export default LoginForm