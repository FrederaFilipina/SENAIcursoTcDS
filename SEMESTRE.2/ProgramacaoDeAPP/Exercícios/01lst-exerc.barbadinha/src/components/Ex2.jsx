function Ex2 (){
    function moedaCorrente(){
        let cambCorrente = prompt(`Informe o Câmbio Corrente:
Dólar, Euro ou Real`)
        let vlrCorrente = Number(prompt("Informe o valor: "))

        

        if(cambCorrente === "Real"){
            let cambFuturo = prompt(`Vai querer converter R$${vlrCorrente.toLocaleString('pt-BR')} em?
Dólar ou Euro`)
            let vlrDlr = 5.3202
            let vlrEr = 6.2624

            if(cambFuturo === "Dólar"){
                let vlrConvertido = (vlrCorrente / vlrDlr).toFixed(2)
                alert(`R$${vlrCorrente.toLocaleString('pt-BR')} equivale a U$${vlrConvertido.toLocaleString('pt-BR')}`)
            }
            else if(cambFuturo === "Euro"){
                let vlrConvertido = (vlrCorrente / vlrEr).toFixed(2)
                alert(`R$${vlrCorrente.toLocaleString('pt-BR')} equivale a ${vlrConvertido.toLocaleString('pt-BR')}€`)
            }
            else{
                alert(`Câmbio informado errado`)
            }
        }
        else if(cambCorrente === "Dólar"){
            let cambFuturo = prompt(`Vai querer converter U$${vlrCorrente.toLocaleString('pt-BR')} em?
Euro ou Real`)
            let vlrEr = 
            let vlrRl = 0.1879
        }
        
        
    }
    return (
        <div>
            <button onClick={moedaCorrente}>Conversor de Moedas</button>
        </div>
    )
}
export default Ex2