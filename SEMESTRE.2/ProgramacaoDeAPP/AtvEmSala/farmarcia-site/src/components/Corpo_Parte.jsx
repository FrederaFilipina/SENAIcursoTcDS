import './Corpo_Parte.css'
import Corpo_Parte1 from './Corpo_Parte1'
import Icons from './Icons'

function Corpo_Parte() {
    return (
        <div>

            <div className="Container-Corpo_Parte0">
                <div className='Corpo_Parte0-texto'>
                    <div className='texto-txt1'>
                        <Corpo_Parte1 txt={<h1 className='txt1'>Bem Vindos!</h1>} />
                    </div>
                    <div className='texto-txt2'>
                        <Corpo_Parte1 txt={<p className='txt2'>
                            É com enorme satisfação e orgulho que eu, Márcia, sobrinha do Mário, assumo a missão de continuar o legado da nossa família. Meu tio sempre foi exemplo de confiança, cuidado e dedicação ao longo da história deste bairro, e é com esse mesmo espírito que darei continuidade ao seu trabalho.
                        </p>} />
                        <Corpo_Parte1 txt={<p className='txt2'>
                            A nova Farmácia chega trazendo mais modernidade e agilidade no atendimento, além de novidades e benefícios que em breve estarão à disposição de todos. Desde já, agradeço de coração pela confiança de sempre!
                        </p>} />
                    </div>
                </div>
                <div className='Corpo_Parte0-img'>
                    <img className='img-logoG' src='./ImgIcon/logoG.png'></img>
                </div>
            </div>

            <div className='Container-Corpo_Parte1'>
                <div className='Corpo_Parte1-icon'>
                    <Icons icons={<img className='icon-endereco' src='./ImgIcon/icon_endereco.svg'></img>}/>

                </div>
                <div className='Corpo_Parte1-img'>
                    <img className='img-cartao' src='./ImgIcon/cartao.png'></img>
                </div>
                <div className='Corpo_Parte1-texto'>
                    <div className='texto-txt3'>
                        <Corpo_Parte1 txt={<p className='txt3'>
                            Estamos localizado no mesmo endereço de sempre:
                        </p>} />
                        <Corpo_Parte1 txt={<p className='txt3'>
                            Rua: Street, nº000-00
                        </p>} />
                        <Corpo_Parte1 txt={<p className='txt3'>
                            Bairro: Neighborhood
                        </p>} />
                        <Corpo_Parte1 txt={<p className='txt3'>
                            CEP: 00000-000
                        </p>} />
                    </div>

                </div>


            </div>

            <div className='Container-Corpo_Parte2'>

                <div className='Corpo_Parte2-img'>
                    <img className='img-camisaG' src='./ImgIcon/camisaG.png'></img>
                </div>
                <div className='Corpo_Parte2-texto'>
                    <div className='texto-txt4'>
                        <Corpo_Parte1 txt={<p className='txt3'>
                            
                        </p>} />
                    </div>

                </div>


            </div>

        </div>

    )
}
export default Corpo_Parte