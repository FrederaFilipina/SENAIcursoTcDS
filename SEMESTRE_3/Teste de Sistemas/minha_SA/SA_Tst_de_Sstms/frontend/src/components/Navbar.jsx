import { Link, useNavigate } from 'react-router-dom'

import {
    logout,
    getUsuarioLogado
} from '../services/localStorage'

function Navbar() {

    const navigate = useNavigate()

    const usuario = getUsuarioLogado()

    function sair() {

        logout()

        navigate('/')
    }

    return (

        <nav className="bg-blue-700 text-white px-8 py-4 flex justify-between items-center">

            <div className="flex gap-6">

                <Link to="/home">
                    Home
                </Link>

                <Link to="/moradores">
                    Moradores
                </Link>

                <Link to="/recados">
                    Recados
                </Link>

            </div>

            <div className="flex items-center gap-4">

                <span>
                    {usuario?.nome}
                </span>

                <button
                    onClick={sair}
                    className="bg-red-500 px-4 py-2 rounded"
                >
                    Sair
                </button>

            </div>

        </nav>
    )
}

export default Navbar