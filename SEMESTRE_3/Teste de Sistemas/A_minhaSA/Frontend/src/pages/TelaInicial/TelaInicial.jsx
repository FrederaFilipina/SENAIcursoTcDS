import CadastroForm from "../../components/CadastroForm/CadastroForm"
import LoginForm from "../../components/LoginForm/LoginForm"

function TelaInicial() {

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 flex items-center justify-center px-4">

      <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full max-w-6xl">

        <div className="w-full md:w-1/2 flex justify-center">
          <CadastroForm />
        </div>

        <div className="hidden md:block w-px h-96 bg-gray-300"></div>

        <div className="w-full md:w-1/2 flex justify-center">
          <LoginForm />
        </div>

      </div>

    </div>
  )
}

export default TelaInicial