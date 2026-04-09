import axios from "axios"
import { useState } from "react"

type Propiedades = {
    setCadastro: (x: any) => void;
}

export const Cadastrar = ({ setCadastro }: Propiedades) => {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const cadastrar = async () => {
        try {
            const response = await axios.post("http://localhost:3000/cadastro", {
                nome,
                email,
                senha
            })
            if (response?.data) {
                setCadastro(false)
                alert("Usuário criado com sucesso!")
            }
        } catch (error) {
            console.log(error)
            alert("Erro ao fazer o cadastro, tente novamente!")
        }
    }

    return (
<div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">

  <div className="w-full max-w-md bg-gray-400 shadow-lg rounded-2xl p-8">

    <h2 className="text-2xl font-semibold text-center mb-6">Crie sua conta</h2>

    <form className="flex flex-col gap-4">

      <div className="flex flex-col gap-1">
        <label htmlFor="nome" className="text-sm font-medium text-gray-700">Nome:</label>
        
        <input type="text" id="nome" onChange={(e) => setNome(e.target.value)} className="border border-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"/>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">E-mail:</label>
        
        <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} className="border border-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"/>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">Senha:</label>

        <input type="password" id="password" onChange={(e) => setSenha(e.target.value)} className="border border-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"/>
      </div>

      <button type="button" onClick={cadastrar} className="mt-4 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-900 transition">Cadastra-se</button>
    </form>

    <p className="text-center text-sm mt-6">
      Já tem conta?{" "}

      <span className="font-semibold text-gray-800 cursor-pointer hover:underline" onClick={() => setCadastro(false)}>Faça o login!</span>
    </p>
  </div>
</div>
    )
}