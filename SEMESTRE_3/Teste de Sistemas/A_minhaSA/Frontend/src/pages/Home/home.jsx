import { useState } from "react"

import Dashboard from "../../components/Dashboard/Dashboard"

import BttnUsuario from "../../components/BttnUsuario/bttnUsuario"
import BttnMeusRecados from "../../components/BttnMeusRecados/bttnMeusRecados"
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

    <Dashboard setPaginaAtual={setPaginaAtual}>

      {renderizarPagina()}

    </Dashboard>

  )
}

export default Home