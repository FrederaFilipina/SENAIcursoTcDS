import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home/home"
import Dashboard from "./pages/Dashboard/dashboard"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App