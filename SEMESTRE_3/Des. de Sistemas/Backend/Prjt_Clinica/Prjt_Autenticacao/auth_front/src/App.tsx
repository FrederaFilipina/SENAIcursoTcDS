import axios from 'axios'
import { useState } from 'react'

function App() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [dataLogin, setDataLogin] = useState(null)

  const logar = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        senha
      })

      if (response?.data) {
        setDataLogin(response.data)
      }
    } catch (error) {
      console.log(error)
      alert("Erro ao fazer o login, verifique suas credenciais!")
    }
  }


  const [cadastro, setCadastro] = useState(false)

  const [nome, setNome] = useState("")
  const [emailCadastro, setEmailCadastro] = useState("")
  const [senhaCadastro, setSenhaCadastro] = useState("")

  const cdstr = () => {
    setCadastro(true)
  }

  const vltrLogin = () => {
    setCadastro(false)
  }

  const criarConta = async () => {
    try {
      const response = await axios.post("http://localhost:3000/cadastro", {
        nome,
        email: emailCadastro,
        senha: senhaCadastro
      })

      if (response?.data) {
        alert("Conta criada com sucesso!")
        setCadastro(false)

      }
    } catch (error) {
      console.log(error)
      alert("Erro ao cadastrar usuário")
    }
  }

  return (
    <>
      {dataLogin !== null ? (
        <div className="flex flex-col bg-gray-400 w-full pt-32 items-center h-screen">
          <h1 className="text-2xl font-semibold text-white">
            Seja bem-vindo fulaninho
          </h1>

          <button
            className="bg-red-800 px-5 py-2 text-white rounded-2xl mt-4"
            onClick={() => setDataLogin(null)}
          >
            Sair
          </button>
        </div>
      ) : (
        <div className="flex flex-col bg-gray-400 w-full justify-center items-center h-screen">

          {!cadastro ? (
            <>
              <form className="flex gap-2 flex-col items-center">

                <label className="text-white">Email</label>

                <input className="px-3 py-2 rounded-md bg-white text-black w-64" type="email" onChange={(e) => setEmail(e.target.value)}/>

                <label className="text-white">Senha</label>
                
                <input className="px-3 py-2 rounded-md bg-white text-black w-64" type="password" onChange={(e) => setSenha(e.target.value)}/>
              </form>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={logar}
                  className="bg-gray-800 px-5 py-2 text-white rounded-2xl hover:bg-gray-700"
                >
                  Login
                </button>

                <button
                  onClick={cdstr}
                  className="bg-gray-800 px-5 py-2 text-white rounded-2xl hover:bg-gray-700"
                >
                  Cadastrar
                </button>
              </div>
            </>
          ) : (
            <>
              <form className="flex gap-2 flex-col items-center">
                <label className="text-white">Nome</label>
                <input
                  className="px-3 py-2 rounded-md bg-white text-black w-64"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />

                <label className="text-white">Email</label>
                <input
                  className="px-3 py-2 rounded-md bg-white text-black w-64"
                  type="email"
                  value={emailCadastro}
                  onChange={(e) => setEmailCadastro(e.target.value)}
                />

                <label className="text-white">Senha</label>
                <input
                  className="px-3 py-2 rounded-md bg-white text-black w-64"
                  type="password"
                  value={senhaCadastro}
                  onChange={(e) => setSenhaCadastro(e.target.value)}
                />
              </form>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={criarConta}
                  className="bg-green-700 px-5 py-2 text-white rounded-2xl hover:bg-green-600"
                >
                  Criar conta
                </button>

                <button
                  onClick={vltrLogin}
                  className="bg-gray-800 px-5 py-2 text-white rounded-2xl hover:bg-gray-700"
                >
                  Voltar
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default App