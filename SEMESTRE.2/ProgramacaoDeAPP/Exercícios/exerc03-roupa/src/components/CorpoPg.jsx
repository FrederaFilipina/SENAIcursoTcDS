function temperatura(){
    let temp = Number (prompt("Qual é a temperatua hoje?"))

    if(30 <= temp){
        alert(`Para ${temp}ºC sugiro que você use:
> Oculos Escuro;
> Regata;
> Shorts;
> e Chinelo`)
    } else if (20 <= temp && temp <= 29) {
        alert(`Para ${temp}ºC sugiro que você use:

> Camiseta;
> Bermuda;
> e Tênis`)
    } else if (13 <= temp && temp <= 19) {
        alert(`Para ${temp}ºC sugiro que você use:

> Touca;
> Camisa;
> Moletom ou Blusa;
> Calça;
> e Tênis`)
    }
    else if (temp <= 12) {
        alert(`Para ${temp}ºC sugiro que você use:

> Touca;
> Cachecol;
> Camisa;
> Moletom ou Blusa;
> Jaqueta
> Calça Termina;
> e Bota`)
    }
}

function CorpoPg(){
    return(
        <div>
            <h1>Roupa</h1>
            <button onClick={temperatura}>Abrir o Guarda Roupas</button>
        </div>
    )
}
export default CorpoPg