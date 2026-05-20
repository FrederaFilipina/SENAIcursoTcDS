import { useNavigate } from "react-router-dom"

function Navbar({ setPaginaAtual }) {

  const navigate = useNavigate()

  function handleLogout() {

    localStorage.removeItem("usuarioLogado")

    navigate("/")
  }

  return (

    <aside
      className="w-full h-full bg-gray-900 text-white
                 flex flex-col justify-between p-6 shadow-2xl"
    >

      {/* TOPO */}
      <div>

        <h1 className="text-2xl font-bold mb-10">
          Minha SA
        </h1>

        <nav className="flex flex-col gap-4">

          {/* USUÁRIO */}
          <button
            onClick={() => setPaginaAtual("usuario")}
            className="w-full bg-gray-800 hover:bg-gray-700
                       rounded-xl px-5 py-4 text-left
                       transition duration-200"
          >
            Usuário
          </button>

          {/* MEUS RECADOS */}
          <button
            onClick={() => setPaginaAtual("meusRecados")}
            className="w-full bg-gray-800 hover:bg-gray-700
                       rounded-xl px-5 py-4 text-left
                       transition duration-200"
          >
            Meus Recados
          </button>

          {/* MURAL */}
          <button
            onClick={() => setPaginaAtual("mural")}
            className="w-full bg-gray-800 hover:bg-gray-700
                       rounded-xl px-5 py-4 text-left
                       transition duration-200"
          >
            Mural do Condomínio
          </button>

        </nav>

      </div>

      {/* RODAPÉ */}
      <div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600
                     rounded-xl px-5 py-4
                     font-semibold transition duration-200"
        >
          Sair
        </button>

      </div>

    </aside>
  )
}

export default Navbar