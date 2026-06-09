import { BrowserRouter, Routes, Route } from "react-router-dom"
import TelaInicial from "./pages/TelaInicial/TelaInicial"
import Home from "./pages/Home/home"
import {ToastContainer} from 'react-toastify'



function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TelaInicial />} />
        <Route path="/dashboard" element={<Home />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  )
}

export default App