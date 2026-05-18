import { useState } from 'react'
import minhaSA from '../../service/minhaSA'

function CadastroForm() {

    const [nome, setNome] = useState('')
    const [bloco, setBloco] = useState('')
    const [num_ap, setNumAp] = useState('')
    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')

    async function handleCadastro(e) {

        e.preventDefault()

        const novoUsuario = {
            nome,
            bloco,
            num_ap,
            usuario,
            senha
        }

        const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios')) || []
        const usuarioExiste = usuariosSalvos.find(u => u.usuario === usuario)

        if (usuarioExiste) {
            alert('Usuário já existe')
            return
        }
        usuariosSalvos.push(novoUsuario)

        localStorage.setItem('usuarios', JSON.stringify(usuariosSalvos))

        alert('Usuário cadastrado com sucesso')
    }

    return (

        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Cadastro
            </h2>

            <form
                onSubmit={handleCadastro}
                className="flex flex-col gap-4"
            >

                <div className="flex items-center gap-4">

                    <label className="font-semibold text-gray-700 w-24">
                        Nome:
                    </label>

                    <input
                        type="text"
                        placeholder="Digite seu nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg p-3 outline-none focus:border-green-500"
                    />

                </div>

                <div className="flex items-center gap-4">

                    <label className="font-semibold text-gray-700 w-24">
                        Bloco:
                    </label>

                    <select
                        value={bloco}
                        onChange={(e) => setBloco(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg p-3 outline-none focus:border-green-500 bg-white"
                    >

                        <option value="">
                            Selecione o bloco
                        </option>

                        <option value="A">
                            Bloco A
                        </option>

                        <option value="B">
                            Bloco B
                        </option>

                    </select>

                </div>

                <div className="flex items-center gap-4">

                    <label className="font-semibold text-gray-700 w-24">
                        Núm. Apartamento:
                    </label>

                    <input
                        type="number"
                        placeholder="Digite o número"
                        value={num_ap}
                        onChange={(e) => setNumAp(e.target.value)}
                        className="
                flex-1 border border-gray-300 rounded-lg p-3 outline-none
                focus:border-green-500
                appearance-none
                [&::-webkit-outer-spin-button]:appearance-none
                [&::-webkit-inner-spin-button]:appearance-none
            "
                    />

                </div>

                <div className="flex items-center gap-4">

                    <label className="font-semibold text-gray-700 w-24">
                        Usuário:
                    </label>

                    <input
                        type="text"
                        placeholder="Digite seu usuário"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg p-3 outline-none focus:border-green-500"
                    />

                </div>

                <div className="flex items-center gap-4">

                    <label className="font-semibold text-gray-700 w-24">
                        Senha:
                    </label>

                    <input
                        type="password"
                        placeholder="Digite sua senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg p-3 outline-none focus:border-green-500"
                    />

                </div>

                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition mt-2"
                >
                    Cadastrar
                </button>

            </form>


        </div>
    )
}

export default CadastroForm