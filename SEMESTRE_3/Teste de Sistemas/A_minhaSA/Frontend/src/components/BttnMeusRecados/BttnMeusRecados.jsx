import { useEffect, useState } from "react"
import minhaSA from "../../service/minhaSA"

function BttnMeusRecados() {

  const usuarioLogado = JSON.parse(
    localStorage.getItem("usuarioLogado")
  )

  const [recados, setRecados] = useState([])

  // 🔵 estados de edição
  const [editando, setEditando] = useState(null)
  const [textoEditado, setTextoEditado] = useState("")

  // 🟢 estados de criação
  const [novoRecado, setNovoRecado] = useState("")
  const [novoTipo, setNovoTipo] = useState("Aviso")

  useEffect(() => {

    async function carregarRecados() {

      try {

        const response = await minhaSA.get("/recados")

        const filtrados = response.data.filter(
          (r) =>
            String(r.responsavel) ===
            String(usuarioLogado.id)
        )

        setRecados(filtrados)

      } catch (error) {

        console.error(
          "❌ ERRO AO BUSCAR RECADOS:",
          error
        )
      }
    }

    carregarRecados()

  }, [usuarioLogado.id])


  // 🟢 CRIAR NOVO RECADO
  async function handleCriarRecado() {

    if (!novoRecado.trim()) return

    try {

      const novo = {
        responsavel: usuarioLogado.id,
        tipo_recado: novoTipo,
        recado: novoRecado,
        status: "ativo",
        criado: new Date().toISOString()
      }

      const response =
        await minhaSA.post("/recados", novo)

      setRecados((prev) => [
        response.data,
        ...prev
      ])

      setNovoRecado("")
      setNovoTipo("Aviso")

    } catch (error) {

      console.error(
        "❌ ERRO AO CRIAR RECADO:",
        error
      )
    }
  }


  // 🔴 DELETE
  async function handleDelete(id) {

    try {

      await minhaSA.delete(`/recados/${id}`)

      setRecados((prev) =>
        prev.filter(
          (recado) => recado.id !== id
        )
      )

    } catch (error) {

      console.error(
        "❌ ERRO AO DELETAR:",
        error
      )
    }
  }


  // ✏️ INICIAR EDIÇÃO
  function handleEditar(recado) {

    setEditando(recado.id)
    setTextoEditado(recado.recado)
  }


  // 💾 SALVAR EDIÇÃO
  async function handleSalvarEdicao(id) {

    try {

      await minhaSA.put(`/recados/${id}`, {

        ...recados.find((r) => r.id === id),

        recado: textoEditado
      })

      setRecados((prev) =>
        prev.map((r) =>
          r.id === id
            ? {
                ...r,
                recado: textoEditado
              }
            : r
        )
      )

      setEditando(null)

    } catch (error) {

      console.error(
        "❌ ERRO AO EDITAR:",
        error
      )
    }
  }


  return (

    <div className="space-y-6">

      {/* 🟢 NOVO RECADO */}
      <div
        className="bg-white border rounded-2xl
                   shadow p-5 flex flex-col gap-4"
      >

        <h2 className="text-2xl font-bold text-gray-800">
          Criar Novo Recado
        </h2>

        {/* TIPO */}
        <select
          value={novoTipo}
          onChange={(e) =>
            setNovoTipo(e.target.value)
          }
          className="border rounded-lg p-3"
        >

          <option value="Aviso">
            Aviso
          </option>

          <option value="Comunicado">
            Comunicado
          </option>

          <option value="Encomenda">
            Encomenda
          </option>

        </select>

        {/* TEXTO */}
        <textarea
          value={novoRecado}
          onChange={(e) =>
            setNovoRecado(e.target.value)
          }
          placeholder="Digite seu recado..."
          className="border rounded-lg p-4
                     min-h-[120px] resize-none"
        />

        {/* BOTÃO */}
        <button
          onClick={handleCriarRecado}
          className="bg-green-500 hover:bg-green-600
                     text-white font-semibold
                     py-3 rounded-xl transition"
        >
          Criar Recado
        </button>

      </div>


      {/* 🔵 LISTA DE RECADOS */}
      <div className="space-y-4">

        {recados.length === 0 ? (

          <p className="text-gray-500">
            Nenhum recado encontrado
          </p>

        ) : (

          recados.map((recado) => (

            <div
              key={recado.id}
              className="p-5 bg-white border
                         rounded-xl shadow
                         flex flex-col gap-3"
            >

              {/* TIPO */}
              <p
                className="text-xs font-semibold
                           text-gray-500 uppercase"
              >
                {recado.tipo_recado}
              </p>

              {/* TEXTO */}
              {editando === recado.id ? (

                <input
                  value={textoEditado}
                  onChange={(e) =>
                    setTextoEditado(
                      e.target.value
                    )
                  }
                  className="border p-2 rounded w-full"
                />

              ) : (

                <p className="text-gray-800 font-medium">
                  {recado.recado}
                </p>

              )}

              {/* DATA */}
              <p className="text-xs text-gray-400">

                Criado em:{" "}

                {new Date(
                  recado.criado
                ).toLocaleString("pt-BR")}

              </p>

              {/* AÇÕES */}
              <div className="flex gap-3">

                {/* EDITAR */}
                {editando === recado.id ? (

                  <button
                    onClick={() =>
                      handleSalvarEdicao(
                        recado.id
                      )
                    }
                    className="px-4 py-1
                               bg-green-500
                               text-white rounded-lg
                               hover:bg-green-600"
                  >
                    Salvar
                  </button>

                ) : (

                  <button
                    onClick={() =>
                      handleEditar(recado)
                    }
                    className="px-4 py-1
                               bg-blue-500
                               text-white rounded-lg
                               hover:bg-blue-600"
                  >
                    Editar
                  </button>

                )}

                {/* EXCLUIR */}
                <button
                  onClick={() =>
                    handleDelete(recado.id)
                  }
                  className="px-4 py-1
                             bg-red-500 text-white
                             rounded-lg
                             hover:bg-red-600"
                >
                  Excluir
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  )
}

export default BttnMeusRecados