import './App.css'
import Ex1 from './components/Ex1'
import Ex2 from './components/Ex2'

function App() {

  return (
    <div className='CorpoPg'>

      <div className='Exs'>

        <div>
          <h2>SQ03 - Exercício: 01</h2>
          <p>
            Crie um programa que permita ao usuário escolher entre três tamanhos de pizza (pequeno, médio e grande) e, com base na escolha, exiba o preço correspondente.
          </p>
        </div>

        <div className='Ex'>
          <Ex1 />
        </div>

      </div>

      <div className='Exs'>

        <div>
          <h2>Exercício: 02 - SQ03</h2>
          <p>
            Crie um aplicativo de conversão de moedas que permita ao usuário escolher entre três moedas (dólar, euro e real) e, com base na escolha, converta um valor de uma moeda para outra.
          </p>
        </div>

        <div>
          <Ex2 />
        </div>

      </div>

      <div className='Exs'>
        <div>
          <h2>Exercício: 03 - SQ03</h2>
          <p>
            Crie um programa que ajude um usuário a escolher roupas com base na temperatura atual. O usuário informa a temperatura e o programa sugere roupas apropriadas (casaco pesado, camiseta, shorts, etc.)
          </p>
        </div>

        <div>

        </div>


      </div>

      <div className='Exs'>
        <div>
          <h2>Exercício: 04 - SQ03</h2>
          <p>
            Desenvolva um sistema de reserva de quartos de hotel, onde o usuário escolhe o tipo de quarto (simples, duplo, suíte) e o programa verifica a disponibilidade e o preço.
          </p>
        </div>

        <div>

        </div>
      </div>

      <div className='Exs'>
        <div>
          <h2>Exercício: 05 - SQ03</h2>
          <p>
            Crie um programa que ajude um usuário a escolher um meio de transporte com base na distância que deseja percorrer (ônibus, metrô, táxi, avião, navio…) e calcule o tempo estimado de viagem. Aqui te dou liberdade para criar suas próprias regras.
          </p>
        </div>

        <div>

        </div>
      </div>

      <div className='Exs'>
        <div>
          <h2>Exercício: 06 - SQ03</h2>
          <p>
            Faça um aplicativo de previsão do tempo que permite ao usuário inserir o nome de uma cidade e, com base na cidade escolhida, fornece a previsão do tempo atual
          </p>
        </div>

        <div>

        </div>
      </div>

    </div>
  )
}

export default App
