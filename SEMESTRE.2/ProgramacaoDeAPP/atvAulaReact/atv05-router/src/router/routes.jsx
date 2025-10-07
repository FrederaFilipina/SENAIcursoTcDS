import {createBrowserRouter} from "react-router-dom";
import Home from "../pages/Home";
import Pg1 from "../pages/Pg1";
import Pg2 from "../pages/Pg2";
import Pg3 from "../pages/Pg3";
import Produtos from "../pages/Produtos";

const rotas = createBrowserRouter([
    {path: '/', element: <Home />},
    {path:'/pag1', element: <Pg1 />},
    {path:'/pag2', element: <Pg2 />},
    {path:'/pag3', element: <Pg3 />},
    {path:'/produtos', element: <Produtos />}
])

export default rotas

//https://www.npmjs.com/package/route?activeTab=versions
// site do npm onde podemos nos atuzliar sobre o mesmo