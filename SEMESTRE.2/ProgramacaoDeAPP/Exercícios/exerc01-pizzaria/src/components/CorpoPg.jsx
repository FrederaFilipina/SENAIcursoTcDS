function pedido(){
    let pizzaTamanho = prompt(`Qual vai ser o tamanho do Pizza?
P - Pequena
M - Média
G - Grande`)

    if(pizzaTamanho === "P"){
        alert("O valor da pizza Pequena é de R$25,00")
    }
    else if(pizzaTamanho === "M"){
        alert("O valor da pizza Pequena é de R$50,00")
    }
    else if(pizzaTamanho === "G"){
        alert("O valor da pizza Pequena é de R$75,00")
    }
    else{
        alert('Tamanho informado INESISTENTE!!!')
    }

}

function CorpoPg (){
    return(
        <div className='CorpoPG-container'>
            <h1>Pizza</h1>
            <button onClick={pedido}>Fazer Pedido</button>
        </div>
    )
}

export default CorpoPg 