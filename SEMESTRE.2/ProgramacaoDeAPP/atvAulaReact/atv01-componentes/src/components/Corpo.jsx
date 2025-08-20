import './Corpo.css'
import Textao from './Textao'
import Texto from './Texto'
import Titulo1 from './Titulo1'
import Titulo2 from './Titulo2'

  function logar(){
    let usuario = prompt("Digite seu nome de usuário: ")
    if (usuario == "adm123"){
      alert("Logado")
    } else {
      alert("Senha errada")
    }
  }



function Corpo() {
  return (
    <div className='corpo-container'>
      <Titulo1 />
      <Titulo2 texto={"Primeiro pedaço de página"} emoji={"🙄"}/>
      <Texto texto={"Texto enviado para o componente via promp"}/>
      <Titulo2 texto={"Segundo pedaço de página"} />
      <Textao textao={"Textão enviado para o componente via promp"}/>
      <img src='./imagens/imgHtml.jpg' alt='' className='imagem-corpo'/>
      <button onClick={logar}> Logar</button>
    </div>
  )
}

export default Corpo
