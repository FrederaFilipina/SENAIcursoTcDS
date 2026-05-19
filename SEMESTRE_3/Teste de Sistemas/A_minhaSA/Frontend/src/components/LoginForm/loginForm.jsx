import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import minhaSA from '../../service/minhaSA'

function LoginForm() {
  const navigate = useNavigate()

  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')

  async function handleLogin(e) {
    e.preventDefault()

    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado))
    navigate("/dashboard")
  }

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">

      <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
        Login
      </h2>

      <p className="text-center text-gray-500 mb-6 text-sm">
        Entre com sua conta para acessar o mural
      </p>

      <form onSubmit={handleLogin} className="flex flex-col gap-5">

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Usuário:</label>
          <input
            type="text"
            placeholder="Digite seu usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none 
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Senha:</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none 
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] 
                     text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          Entrar
        </button>

      </form>

    </div>
  )
}

export default LoginForm