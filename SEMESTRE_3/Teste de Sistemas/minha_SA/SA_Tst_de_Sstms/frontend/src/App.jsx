import { BrowserRouter, Routes, Route } from "react-router-dom"

import { Home } from "./pages/Home"
import { Recado } from "./pages/Recado"

function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/recado"
                    element={<Recado />}
                />

            </Routes>

        </BrowserRouter>
    )
}

export default App