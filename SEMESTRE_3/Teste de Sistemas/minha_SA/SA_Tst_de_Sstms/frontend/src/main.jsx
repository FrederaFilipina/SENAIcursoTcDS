import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

import './index.css'


// cria usuário padrão
const moradores = JSON.parse(
    localStorage.getItem('moradores')
)

if (!moradores || moradores.length === 0) {

    const moradorPadrao = [
        {
            id: 1,
            nome: 'Administrador',
            bloco: 'A',
            num_ap: '101',
            usuario: 'admin',
            senha: '123'
        }
    ]

    localStorage.setItem(
        'moradores',
        JSON.stringify(moradorPadrao)
    )
}


ReactDOM.createRoot(
    document.getElementById('root')
).render(

    <React.StrictMode>
        <App />
    </React.StrictMode>
)