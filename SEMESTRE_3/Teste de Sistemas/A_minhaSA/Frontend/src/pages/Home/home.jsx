import CadastroForm from "../../components/CadastroForm/cadastroForm"
import LoginForm from "../../components/LoginForm/loginForm"


function Home() {

    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

    if (!usuarioLogado) {

        return (

            <div className="min-h-screen bg-gray-100 flex items-center justify-center">

                <div className="flex flex-row items-center gap-10">

                    <CadastroForm />

                    <LoginForm />

                </div>

            </div>
        )
    }

    return (

        <div className="min-h-screen flex flex-col items-center justify-center">

            <h1 className="text-2xl font-bold">
                Bem-vindo, {usuarioLogado.nome}
            </h1>

            <p>
                Usuário: {usuarioLogado.usuario}
            </p>

        </div>
    )
}

export default Home