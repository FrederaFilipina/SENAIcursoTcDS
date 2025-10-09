import{createBrowserRouter} from "react-router-dom"
import Home from "../pages/Home"
import Barzinho from "../pages/Barzinho"
import Borracharia from "../pages/Borracharia"
import Sorveteria from "../pages/Sorveteria"
import Fiado from "../pages/Fiado"



const rotas = createBrowserRouter([
    {path: '/', element: <Home />},
    {path: '/barzinho', element: <Barzinho />},
    {path: '/borracharia', element: <Borracharia />},
    {path: '/sorveteria', element: <Sorveteria />},
    {path: '/fiado', element: <Fiado />}
])

export default rotas