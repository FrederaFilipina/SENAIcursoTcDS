import './CorpoPG.css'



function pedido(){
    let pizzaTamanho = prompt(`Qual vai ser o tamanho do Pizza?
P - Pequeno
M - Média
G - Grande`)
    if(pizzaTamanho === "P" || pizzaTamanho === "p"){
        console.log(`Pp - Tamanho informado ${pizzaTamanho}`)
    }
    else if(pizzaTamanho === "M" || pizzaTamanho === "m"){
        console.log(`Tamanho informado ${pizzaTamanho}`)
    }
    else if(pizzaTamanho === "G" || pizzaTamanho === "g"){
        console.log(`Tamanho informado ${pizzaTamanho}`)
    }
    else{
        alert('Tamanho informado INESISTENTE!!!')
        pedido()
    }

}


function CorpoPg (){
    return(
        <div className='CorpoPG-container'>
            <button onClick={pedido}>Fazer Pedido</button>

            
        </div>
    )
}

export default CorpoPg