import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import minhaSA from "../../service/minhaSA"

import CardRecado from "../../components/CardRecado/CardRecado"

function BttnMeusRecados() {

  const usuarioLogado = JSON.parse(
    localStorage.getItem("usuarioLogado")
  )

  const [recados, setRecados] = useState([])
  const [editando, setEditando] = useState(null)
  const [textoEditado, setTextoEditado] = useState("")

  const [novoRecado, setNovoRecado] = useState("")
  const [novoTipo, setNovoTipo] = useState("Aviso")

  console.log('ESTADO ATUAL', {
  editando,
  tipoEditando: typeof editando
})

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

        toast.error(
          "Erro ao carregar recados"
        )
      }
    }

    carregarRecados()

  }, [usuarioLogado.id])

  async function handleCriarRecado() {

    if (!novoRecado.trim()) {

      toast.error(
        "O recado não pode estar vazio"
      )

      return
    }

    try {

      const novo = {
        responsavel: usuarioLogado.id,
        tipo_recado: novoTipo,
        recado: novoRecado.trim(),
        status: "ativo",
        criado: new Date().toISOString()
      }

      const response =
        await minhaSA.post(
          "/recados",
          novo
        )

      setRecados(
        (prev) => [
          response.data,
          ...prev
        ]
      )

      setNovoRecado("")
      setNovoTipo("Aviso")

      toast.success(
        "Recado criado com sucesso"
      )

    } catch (error) {

      console.error(
        "❌ ERRO AO CRIAR RECADO:",
        error
      )

      toast.error(
        "Erro ao criar recado"
      )
    }
  }

  async function handleDelete(id) {

    try {

      await minhaSA.delete(
        `/recados/${id}`
      )

      setRecados(
        (prev) =>
          prev.filter(
            (recado) =>
              recado.id !== id
          )
      )

      toast.success(
        "Recado excluído com sucesso"
      )

    } catch (error) {

      console.error(
        "❌ ERRO AO DELETAR:",
        error
      )

      toast.error(
        "Erro ao excluir recado"
      )
    }
  }

  function handleEditar(recado) {

    console.log('CLICOU EDITAR', {
    id: recado.id,
    tipo: typeof recado.id
  })

    setEditando(recado.id)

    setTextoEditado(
      recado.recado
    )
  }

  function handleCancelarEdicao() {

    setEditando(null)
    setTextoEditado("")
  }

  async function handleSalvarEdicao(id) {

    if (!textoEditado.trim()) {

      toast.error(
        "O recado não pode ficar vazio"
      )

      return
    }

    try {

      await minhaSA.put(
        `/recados/${id}`,
        {
          ...recados.find(
            (r) => r.id === id
          ),
          recado:
            textoEditado.trim()
        }
      )

      setRecados(
        (prev) =>
          prev.map(
            (r) =>
              r.id === id
                ? {
                  ...r,
                  recado:
                    textoEditado.trim()
                }
                : r
          )
      )

      setEditando(null)
      setTextoEditado("")

      toast.success(
        "Recado atualizado com sucesso"
      )

    } catch (error) {

      console.error(
        "❌ ERRO AO EDITAR:",
        error
      )

      toast.error(
        "Erro ao atualizar recado"
      )
    }
  }

  console.log(
    "BttnMeusRecados -> editando:",
    editando,
    typeof editando
  )

  return (

    <div className="space-y-6">

      <div
        className="bg-cyan-800 rounded-2xl shadow-lg
                   border border-cyan-300
                   p-6 flex flex-col gap-4"
      >

        <h2 className="text-3xl font-bold text-white">
          Criar Novo Recado
        </h2>

        <select
          data-testid="tipo-recado"
          value={novoTipo}
          onChange={(e) =>
            setNovoTipo(
              e.target.value
            )
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

        <textarea
          data-testid="novo-recado"
          value={novoRecado}
          onChange={(e) =>
            setNovoRecado(
              e.target.value
            )
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

        <button
          data-testid="btn-criar-recado"
          onClick={
            handleCriarRecado
          }
          className="bg-cyan-950
                     hover:bg-green-600
                     text-white
                     font-semibold
                     py-4
                     rounded-xl
                     transition"
        >
          Criar Recado
        </button>

      </div>

      <div className="space-y-6">

        {recados.length === 0 ? (

          <div
            className="bg-cyan-800
                       rounded-2xl
                       border
                       border-cyan-300
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
              data-testid={`recado-${recado.id}`}
              className="bg-cyan-800
                         rounded-2xl
                         border
                         border-cyan-300
                         shadow-lg
                         p-5"
            >

              <CardRecado
                recado={recado}
                nomeUsuario={usuarioLogado.nome}
                editando={editando}
                textoEditado={textoEditado}
                setTextoEditado={setTextoEditado}
                onEditar={handleEditar}
                onSalvar={handleSalvarEdicao}
                onExcluir={handleDelete}
                onCancelar={handleCancelarEdicao}
                mostrarAcoes={true}
              />

            </div>

          ))

        )}

      </div>

    </div>
  )
}

export default BttnMeusRecados