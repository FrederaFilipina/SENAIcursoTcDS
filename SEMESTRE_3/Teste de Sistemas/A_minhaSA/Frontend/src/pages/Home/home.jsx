import { useEffect, useState } from "react"
import Dashboard from "../../components/Dashboard/Dashboard"
import BttnUsuario from "../../components/BttnUsuario/BttnUsuario"
import BttnMeusRecados from "../../components/BttnMeusRecados/BttnMeusRecados"
import BttnMural from "../../components/BttnMural/BttnMural"

function Home() {
  const [paginaAtual, setPaginaAtual] = useState(null)

  function alterarPagina(novaPagina) {
    setPaginaAtual(novaPagina)

    localStorage.setItem(
      "paginaAtual",
      novaPagina
    )
  }

  useEffect(() => {
    const usuarioLogado =
      localStorage.getItem("usuarioLogado")

    const paginaSalva =
      localStorage.getItem("paginaAtual")

    if (usuarioLogado) {
      if (paginaSalva) {
        setPaginaAtual(paginaSalva)
      } else {
        alterarPagina("mural")
      }
    }
  }, [])

  function renderizarPagina() {
    switch (paginaAtual) {
      case "usuario":
        return <BttnUsuario />

      case "meusRecados":
        return <BttnMeusRecados />

      case "mural":
        return <BttnMural />

      default:
        return <BttnMural />
    }
  }

  return (
    <Dashboard
      paginaAtual={paginaAtual}
      setPaginaAtual={alterarPagina}
    >
      {renderizarPagina()}
    </Dashboard>
  )
}

export default Home