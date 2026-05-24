import { useState } from "react"

import Dashboard from "../../components/Dashboard/Dashboard"

import BttnUsuario from "../../components/BttnUsuario/BttnUsuario"
import BttnMeusRecados from "../../components/BttnMeusRecados/BttnMeusRecados"
import BttnMural from "../../components/BttnMural/BttnMural"

function Home() {

  // 🔵 agora o mural abre primeiro
  const [paginaAtual, setPaginaAtual] =
    useState("mural")

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
      setPaginaAtual={setPaginaAtual}
    >

      {renderizarPagina()}

    </Dashboard>

  )
}

export default Home