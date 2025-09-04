import './App.css'
import Aula from './components/Aula'
import Ex3 from './components/Ex3'
import Ex1 from './components/Ex1'
import Ex2 from './components/Ex2'
import Ex4 from './components/Ex4'

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
      <div className='Exs'>
        <Ex3 />
      </div>
      <div>
        <Ex4 />
      </div>
    </div>
  )
}

export default App