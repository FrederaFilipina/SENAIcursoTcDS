import { useState } from "react"
import minhaSA from "../../service/minhaSA"

function BttnUsuario() {

  const usuarioLogado =
    JSON.parse(localStorage.getItem("usuarioLogado"))

  const [nome, setNome] = useState(usuarioLogado?.nome || "")
  const [bloco, setBloco] = useState(usuarioLogado?.bloco || "")
  const [num_ap, setNumAp] = useState(usuarioLogado?.num_ap || "")
  const [usuario, setUsuario] = useState(usuarioLogado?.usuario || "")
  const [senha, setSenha] = useState(usuarioLogado?.senha || "")

  async function handleSalvar(e) {

    e.preventDefault()

    try {

      const usuarioAtualizado = {
        ...usuarioLogado,
        nome,
        bloco,
        num_ap,
        usuario,
        senha
      }

      await minhaSA.put(
        `/usuarios/${usuarioLogado.id}`,
        usuarioAtualizado
      )

      localStorage.setItem(
        "usuarioLogado",
        JSON.stringify(usuarioAtualizado)
      )

      alert("Dados atualizados com sucesso")

    } catch (error) {

      console.error(error)

      alert("Erro ao atualizar usuário")
    }
  }

  return (

    <div className="w-full">

      <div
        className="bg-white rounded-2xl shadow-lg border border-gray-200
                   p-8"
      >

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Meu Usuário
        </h1>

        <p className="text-gray-500 mb-8">
          Consulte e edite suas informações
        </p>

        <form
          onSubmit={handleSalvar}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          <div className="flex flex-col gap-2">

            <label className="text-sm text-gray-600">
              Nome
            </label>

            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-3
                         outline-none focus:ring-2 focus:ring-gray-300"
            />

          </div>

          <div className="flex flex-col gap-2">

            <label className="text-sm text-gray-600">
              Bloco
            </label>

            <select
              value={bloco}
              onChange={(e) => setBloco(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-3
                         outline-none focus:ring-2 focus:ring-gray-300"
            >

              <option value="">Selecione</option>
              <option value="A">Bloco A</option>
              <option value="B">Bloco B</option>

            </select>

          </div>

          <div className="flex flex-col gap-2">

            <label className="text-sm text-gray-600">
              Apartamento
            </label>

            <input
              type="number"
              value={num_ap}
              onChange={(e) => setNumAp(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-3
                         outline-none focus:ring-2 focus:ring-gray-300"
            />

          </div>

          <div className="flex flex-col gap-2">

            <label className="text-sm text-gray-600">
              Usuário
            </label>

            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-3
                         outline-none focus:ring-2 focus:ring-gray-300"
            />

          </div>

          <div className="flex flex-col gap-2 md:col-span-2">

            <label className="text-sm text-gray-600">
              Senha
            </label>

            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-3
                         outline-none focus:ring-2 focus:ring-gray-300"
            />

          </div>

          <div className="md:col-span-2">

            <button
              type="submit"
              className="w-full bg-gray-900 hover:bg-gray-800
                         text-white font-semibold py-4 rounded-xl
                         transition"
            >
              Salvar Alterações
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}

export default BttnUsuario