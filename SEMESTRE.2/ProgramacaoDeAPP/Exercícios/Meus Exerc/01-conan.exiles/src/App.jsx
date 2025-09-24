import { useState } from 'react'
import './App.css'
import CorpoPg_0 from './assets/components/CorpoPg_0'
import MenuInicial_0 from './assets/components/MenuInicial_0'

function App() {

  const[paginaNome, setPgNome] = useState('Bem Vindo!')
  
  return (
    <div>
      <MenuInicial_0 paginaNome={paginaNome} setPgNome={setPgNome}/>
      <CorpoPg_0 paginaNome={paginaNome}/>
    </div>
  )
}

export default App
