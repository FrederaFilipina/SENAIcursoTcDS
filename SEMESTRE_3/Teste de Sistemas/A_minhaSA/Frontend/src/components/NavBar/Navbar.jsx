import { useNavigate } from "react-router-dom"

function Navbar({
  setPaginaAtual,
  paginaAtual
}) {

  const navigate = useNavigate()

  function handleLogout() {

    localStorage.removeItem("usuarioLogado")

    navigate("/")
  }

  function estiloBotao(nomePagina) {

    if (paginaAtual === nomePagina) {

      return "w-full bg-cyan-600 rounded-xl px-5 py-4 text-left transition duration-200"
    }

    return "w-full bg-cyan-950 hover:bg-cyan-600 rounded-xl px-5 py-4 text-left transition duration-200"
  }

  return (

    <aside className="w-full h-full bg-cyan-800 text-white flex flex-col justify-between p-6 shadow-2xl">

      <div>

        <nav className="flex flex-col gap-4">

          {/* USUÁRIO */}
          <button
            onClick={() => setPaginaAtual("usuario")}
            className={estiloBotao("usuario")}
          >
            Usuário
          </button>

          {/* MEUS RECADOS */}
          <button
            onClick={() => setPaginaAtual("meusRecados")}
            className={estiloBotao("meusRecados")}
          >
            Meus Recados
          </button>

          {/* MURAL */}
          <button
            onClick={() => setPaginaAtual("mural")}
            className={estiloBotao("mural")}
          >
            Mural
          </button>

        </nav>

      </div>

      <div>

        <button
          onClick={handleLogout}
          className="w-full bg-cyan-900 hover:bg-red-600 rounded-xl px-5 py-4 font-semibold transition duration-200"
        >
          Sair
        </button>

      </div>

    </aside>
  )
}

export default Navbar