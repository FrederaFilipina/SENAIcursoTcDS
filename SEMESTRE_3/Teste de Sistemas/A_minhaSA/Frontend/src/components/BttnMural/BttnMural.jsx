import { useEffect, useState } from "react"
import minhaSA from "../../service/minhaSA"

function BttnMural() {

  const [recados, setRecados] = useState([])
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {

    async function carregarDados() {

      try {

        // 🔵 busca usuários
        const usuariosRes = await minhaSA.get("/usuarios")

        // 🔵 busca recados
        const recadosRes = await minhaSA.get("/recados")

        setUsuarios(usuariosRes.data)
        setRecados(recadosRes.data)

      } catch (error) {
        console.error("❌ ERRO AO CARREGAR MURAL:", error)
      }
    }

    carregarDados()

  }, [])

  // 🔵 função para achar nome do usuário
  function getNomeUsuario(id) {

    const usuario = usuarios.find(
      (u) => String(u.id) === String(id)
    )

    return usuario?.nome || "Desconhecido"
  }


  return (

    <div className="space-y-4">

      {recados.length === 0 ? (
        <p className="text-gray-500">
          Nenhum recado no mural
        </p>
      ) : (

        recados.map((recado) => (

          <div
            key={recado.id}
            className="p-5 bg-white border rounded-xl shadow space-y-2"
          >

            {/* AUTOR */}
            <p className="text-sm font-semibold text-gray-700">
              {getNomeUsuario(recado.responsavel)}
            </p>

            {/* TIPO */}
            <p className="text-xs text-gray-500 uppercase">
              {recado.tipo_recado}
            </p>

            {/* TEXTO */}
            <p className="text-gray-800 font-medium">
              {recado.recado}
            </p>

            {/* DATA */}
            <p className="text-xs text-gray-400">
              {new Date(recado.criado).toLocaleString("pt-BR")}
            </p>

          </div>

        ))

      )}

    </div>
  )
}

export default BttnMural