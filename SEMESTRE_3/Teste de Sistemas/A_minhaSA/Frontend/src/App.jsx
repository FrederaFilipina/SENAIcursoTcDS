import { BrowserRouter, Routes, Route } from "react-router-dom"
import TelaInicial from "./pages/TelaInicial/TelaInicial"
import Home from "./pages/Home/home"



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TelaInicial />} />
        <Route path="/dashboard" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App