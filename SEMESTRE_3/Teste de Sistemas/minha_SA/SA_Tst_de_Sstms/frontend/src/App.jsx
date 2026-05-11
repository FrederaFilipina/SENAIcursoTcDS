import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from 'react-router-dom'

import Login from './pages/Login'
import Home from './pages/Home'
import Moradores from './pages/Moradores'
import Recados from './pages/Recados'

import { getUsuarioLogado } from './services/localStorage'


function PrivateRoute({ children }) {

    const usuario = getUsuarioLogado()

    if (!usuario) {
        return <Navigate to="/" />
    }

    return children
}


function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* LOGIN */}
                <Route
                    path="/"
                    element={<Login />}
                />

                {/* HOME */}
                <Route
                    path="/home"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />

                {/* MORADORES */}
                <Route
                    path="/moradores"
                    element={
                        <PrivateRoute>
                            <Moradores />
                        </PrivateRoute>
                    }
                />

                {/* RECADOS */}
                <Route
                    path="/recados"
                    element={
                        <PrivateRoute>
                            <Recados />
                        </PrivateRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    )
}

export default App