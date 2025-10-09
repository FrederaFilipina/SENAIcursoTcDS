import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import rotas from './router/routes'
import ProdutosProvider from './contexts/Produtos'

createRoot(document.getElementById('root')).render(
  <ProdutosProvider>

    <RouterProvider router={rotas}>

    </RouterProvider>

  </ProdutosProvider>
)
