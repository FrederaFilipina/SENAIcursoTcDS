import { useState } from "react"
import { useNavigate } from "react-router-dom"
import minhaSA from "../../service/minhaSA"

function BttnUsuario() {

  const navigate = useNavigate()

  const usuarioLogado =
    JSON.parse(localStorage.getItem("usuarioLogado"))

  const [modoEdicao, setModoEdicao] = useState(false)

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

      setModoEdicao(false)

    } catch (error) {

      console.error(error)

      alert("Erro ao atualizar usuário")
    }
  }

  async function handleExcluirUsuario() {

    const confirmar = confirm(
      "Tem certeza que deseja excluir sua conta?"
    )

    if (!confirmar) {
      return
    }

    try {

      await minhaSA.delete(
        `/usuarios/${usuarioLogado.id}`
      )

      localStorage.removeItem("usuarioLogado")

      alert("Usuário excluído com sucesso")

      navigate("/")

    } catch (error) {

      console.error(error)

      alert("Erro ao excluir usuário")
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
          Consulte e gerencie suas informações
        </p>

        {!modoEdicao ? (

          <div className="flex flex-col gap-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <p className="text-sm text-gray-500">
                  Nome
                </p>

                <p className="text-lg font-medium text-gray-800">
                  {usuarioLogado?.nome}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Bloco
                </p>

                <p className="text-lg font-medium text-gray-800">
                  {usuarioLogado?.bloco}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Apartamento
                </p>

                <p className="text-lg font-medium text-gray-800">
                  {usuarioLogado?.num_ap}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Usuário
                </p>

                <p className="text-lg font-medium text-gray-800">
                  {usuarioLogado?.usuario}
                </p>
              </div>

            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-6">

              <button
                onClick={() => setModoEdicao(true)}
                className="flex-1 bg-gray-900 hover:bg-gray-800
                           text-white font-semibold py-4 rounded-xl
                           transition"
              >
                Alterar Informações
              </button>

              <button
                onClick={handleExcluirUsuario}
                className="flex-1 bg-red-600 hover:bg-red-700
                           text-white font-semibold py-4 rounded-xl
                           transition"
              >
                Excluir Usuário
              </button>

            </div>

          </div>

        ) : (

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

            <div className="md:col-span-2 flex flex-col md:flex-row gap-4">

              <button
                type="submit"
                className="flex-1 bg-gray-900 hover:bg-gray-800
                           text-white font-semibold py-4 rounded-xl
                           transition"
              >
                Salvar Alterações
              </button>

              <button
                type="button"
                onClick={() => setModoEdicao(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300
                           text-gray-800 font-semibold py-4 rounded-xl
                           transition"
              >
                Cancelar
              </button>

            </div>

          </form>

        )}

      </div>

    </div>
  )
}

export default BttnUsuario