import { useEffect, useState } from "react"
import minhaSA from "../../service/minhaSA"

import CardRecado from "../../components/CardRecado/CardRecado"

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

        const filtrados = response.data
          .filter(
            (r) =>
              String(r.responsavel) ===
              String(usuarioLogado.id)
          )
          .sort(
            (a, b) =>
              new Date(b.criado) -
              new Date(a.criado)
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
        className="bg-cyan-800 rounded-2xl shadow-lg
                   border border-cyan-300
                   p-6 flex flex-col gap-4"
      >

        <h2 className="text-3xl font-bold text-white">
          Criar Novo Recado
        </h2>

        {/* TIPO */}
        <select
          value={novoTipo}
          onChange={(e) =>
            setNovoTipo(e.target.value)
          }
          className="bg-white border-2
                     border-cyan-950
                     rounded-xl p-3
                     outline-none
                     focus:ring-2
                     focus:ring-cyan-400"
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
          className="bg-white border-2
                     border-cyan-950
                     rounded-xl p-4
                     min-h-[120px]
                     resize-none
                     outline-none
                     focus:ring-2
                     focus:ring-cyan-400"
        />

        {/* BOTÃO */}
        <button
          onClick={handleCriarRecado}
          className="bg-cyan-950
                     hover:bg-green-600
                     text-white font-semibold
                     py-4 rounded-xl
                     transition"
        >
          Criar Recado
        </button>

      </div>


      {/* 🔵 LISTA DE RECADOS */}
      <div className="space-y-6">

        {recados.length === 0 ? (

          <div
            className="bg-cyan-800 rounded-2xl
                       border border-cyan-300
                       p-6 shadow-lg"
          >

            <p className="text-white text-lg">
              Nenhum recado encontrado
            </p>

          </div>

        ) : (

          recados.map((recado) => (

            <div
              key={recado.id}
              className="bg-cyan-800 rounded-2xl
                         border border-cyan-300
                         shadow-lg p-5"
            >

              <CardRecado
                recado={recado}
                nomeUsuario={usuarioLogado.nome}
              />

              {/* AÇÕES */}
              <div
                className="flex flex-col md:flex-row
                           gap-3 mt-5"
              >

                {/* EXCLUIR */}
                <button
                  onClick={() =>
                    handleDelete(recado.id)
                  }
                  className="px-6 py-3
                             bg-red-800
                             text-white
                             rounded-xl
                             font-semibold
                             hover:bg-red-600
                             transition"
                >
                  Excluir
                </button>

                {/* EDITAR */}
                {editando === recado.id ? (

                  <div
                    className="flex flex-1
                               flex-col md:flex-row
                               gap-3"
                  >

                    <input
                      value={textoEditado}
                      onChange={(e) =>
                        setTextoEditado(
                          e.target.value
                        )
                      }
                      className="bg-white border-2
                                 border-cyan-950
                                 rounded-xl
                                 px-4 py-3
                                 w-full
                                 outline-none
                                 focus:ring-2
                                 focus:ring-cyan-400"
                    />

                    <button
                      onClick={() =>
                        handleSalvarEdicao(
                          recado.id
                        )
                      }
                      className="px-6 py-3
                                 bg-cyan-950
                                 text-white
                                 rounded-xl
                                 font-semibold
                                 hover:bg-green-600
                                 transition"
                    >
                      Salvar
                    </button>

                    <button
                      onClick={() => {
                        setEditando(null)
                        setTextoEditado("")
                      }}
                      className="px-6 py-3
                                 bg-cyan-950
                                 text-white
                                 rounded-xl
                                 font-semibold
                                 hover:bg-gray-500
                                 transition"
                    >
                      Cancelar
                    </button>

                  </div>

                ) : (

                  <button
                    onClick={() =>
                      handleEditar(recado)
                    }
                    className="px-6 py-3
                               bg-cyan-950
                               text-white
                               rounded-xl
                               font-semibold
                               hover:bg-cyan-600
                               transition"
                  >
                    Editar
                  </button>

                )}

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  )
}

export default BttnMeusRecados