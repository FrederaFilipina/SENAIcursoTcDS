function moeda(){
    let moedaAtual = prompt(`Qual é o câmbio da Moeda?
R$       Real
US$     Dolar
€$        Euro

(digite o nome da moeda)`)

    let valorI = prompt(`Qual é o valor?

(digite apenas os números)`)
    let valorReal = 1
    let valorDolar = 5.44
    let valorEuro = 6.35

if(moedaAtual === "Real"){
    let moedaConv = prompt(`Informe para qual câmbio você quer converter:
US$     Dolar
€$        Euro

(digite o nome da moeda)`)
    if(moedaConv === "Dolar"){
        let valorF = valorI / valorDolar
        alert(`R$ ${valorI} = US$ ${valorF.toFixed(2)}`)
    } else {
        let valorF = valorI / valorEuro
        alert(`R$ ${valorI} = US$ ${valorF.toFixed(2)}`)
    }
} else if (moedaAtual === "Dolar"){
     let moedaConv = prompt(`Informe para qual câmbio você quer converter:
R$       Real
€$        Euro

(digite o nome da moeda)`)
    if(moedaConv === "Real"){
        let valorF = valorI * valorDolar
        alert(`US$ ${valorI} = R$ ${valorF.toFixed(2)}`)
    } else {
        let valorF = (valorI * valorDolar) / valorEuro
        alert(`US$ ${valorI} = €$ ${valorF.toFixed(2)}`)
    }
} else {
    let moedaConv = prompt(`Informe para qual câmbio você quer converter:
R$       Real
US$     Dolar

(digite o nome da moeda)`)
    if(moedaConv === "Real"){
        let valorF = valorI * valorEuro
        alert(`€$ ${valorI} = R$ ${valorF.toFixed(2)}`)
    } else {
        let valorF = (valorI * valorEuro) / valorDolar
        alert(`€$ ${valorI} = US$ ${valorF.toFixed(2)}`)
    }
}

}

function CorpoPg(){
    return(
        <div>
            <h1>Moeda</h1>
            <button onClick={moeda}>Informe o Câmbio</button>
        </div>
    )
}
export default CorpoPg