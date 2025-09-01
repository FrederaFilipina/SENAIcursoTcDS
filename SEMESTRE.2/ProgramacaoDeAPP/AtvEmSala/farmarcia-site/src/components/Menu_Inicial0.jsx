
import './Menu_Inicial0.css'
import Menu_Inicial1 from './Menu_Inicial1'
import Icons from './Icons'
import Imgs from './Imgs'

function Menu_Inicial0 () {
    return(
        <div className="Container-Menu_Inicial">
            <div className='Menu_Inicial-nome_icon'>

                <div className='Menu_Inicial-nome'>
                    <Menu_Inicial1 titulo={"F"}/>
                    <Menu_Inicial1 titulo={"A"}/>
                    <Menu_Inicial1 titulo={"R"}/>
                    <Menu_Inicial1 titulo={"M"}/>
                    <Menu_Inicial1 titulo={"Á"}/>
                    <Menu_Inicial1 titulo={"R"}/>
                    <Menu_Inicial1 titulo={"C"}/>
                    <Menu_Inicial1 titulo={"I"}/>
                    <Menu_Inicial1 titulo={"A"}/>
                </div>
                <div className='Menu_Inicial-icon'>
                    <button className='icon-bttns'>
                        <Icons icons={<img className='icon-icons' src='./ImgIcon/icon_endereco.svg'></img>}/>
                        <Icons icons={<p className='icon-nomes'>Endereço</p>} />
                    </button>
                    <button className='icon-bttns'>
                        <Icons icons={<img className='icon-icons' src='./ImgIcon/icon_home.svg'></img>}/>
                        <Icons icons={<p className='icon-nomes'>Home</p>} />
                    </button>
                    <button className='icon-bttns'>
                        <Icons icons={<img className='icon-icons' src='./ImgIcon/icon_produtos.svg'></img>}/>
                        <Icons icons={<p className='icon-nomes'>Produtos</p>} />
                    </button>
                    <button className='icon-bttns'>
                        <Icons icons={<img className='icon-icons' src='./ImgIcon/icon_compras.svg'></img>}/>
                        <Icons icons={<p className='icon-nomes'>Compras</p>} />
                    </button>
                </div>
            </div>
            <div className='Menu_Inicial-img'>
                {/* <Imgs className='img-placa' placa={<img src='./ImgIcon/placa.png'></img>}/> */}
                <img className='img-placa' src='./ImgIcon/placa.png'></img>
            </div>
        </div>
    )
}
export default Menu_Inicial0