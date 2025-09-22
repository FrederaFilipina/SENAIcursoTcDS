import MenuIcons from "./MenuIcons"
import './Menu.css'
import MenuTitulo from "./MenuTitulo"

function Menu(){
    return(
        <div className="cont-Menu">

            <div className="Menu-titulo">
                <div className="titulo">
                    <MenuTitulo titulo={"C"}/>
                    <MenuTitulo titulo={"o"}/>
                    <MenuTitulo titulo={"n"}/>
                    <MenuTitulo titulo={"a"}/>
                    <MenuTitulo titulo={"n"}/>
                </div>
                <div className="titulo">
                    <MenuTitulo titulo={"E"}/>
                    <MenuTitulo titulo={"x"}/>
                    <MenuTitulo titulo={"i"}/>
                    <MenuTitulo titulo={"l"}/>
                    <MenuTitulo titulo={"e"}/>
                    <MenuTitulo titulo={"s"}/>
                </div>
            </div>

            <div className="Menu-icons">
                <MenuIcons />
            </div>
        </div>
    )
}
export default Menu