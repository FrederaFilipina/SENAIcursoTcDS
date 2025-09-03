import './App.css'
import Aula from './components/aula'
import Ex1 from './components/Ex1'
import Ex2 from './components/Ex2'

function App() {
  return (
    <div className='Pagina'>
      <div className='aula'>
        <Aula />
      </div>
      <div className='Exs'>
        <Ex1 />
      </div>
      <div className='Exs'>
        <Ex2 />
      </div>
    </div>
  )
}

export default App