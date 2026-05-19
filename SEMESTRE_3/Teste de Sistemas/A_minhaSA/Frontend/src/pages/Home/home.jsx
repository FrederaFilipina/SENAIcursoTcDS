import CadastroForm from "../../components/CadastroForm/cadastroForm"
import LoginForm from "../../components/LoginForm/loginForm"

function Home() {

  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

  if (usuarioLogado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 flex items-center justify-center px-4">

        <div className="bg-white shadow-xl rounded-2xl border border-gray-100 p-10 text-center max-w-md w-full">

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo
          </h1>

          <p className="text-gray-600 mb-6">
            {usuarioLogado.nome}
          </p>

          <div className="text-sm text-gray-500 space-y-1">
            <p>
              Usuário: <span className="font-medium text-gray-700">{usuarioLogado.usuario}</span>
            </p>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("usuarioLogado")
              window.location.reload()
            }}
            className="mt-6 w-full bg-red-500 hover:bg-red-600 active:scale-[0.99]
                       text-white font-semibold py-3 rounded-lg transition"
          >
            Sair
          </button>

        </div>

      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 flex items-center justify-center px-4">

      {/* CONTAINER PRINCIPAL */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full max-w-6xl">

        {/* CADASTRO */}
        <div className="w-full md:w-1/2 flex justify-center">
          <CadastroForm />
        </div>

        {/* DIVISOR (apenas desktop) */}
        <div className="hidden md:block w-px h-96 bg-gray-300"></div>

        {/* LOGIN */}
        <div className="w-full md:w-1/2 flex justify-center">
          <LoginForm />
        </div>

      </div>

    </div>
  )
}

export default Home