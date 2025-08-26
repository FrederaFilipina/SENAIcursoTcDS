function reserva() {
    let quartos = prompt(`Qual o tipo de quarto que deseja?
Simples;
Duplo;
ou Suíte;`)

    let qntd = Number(prompt(`Quantos quartos você precisa?`))
    let qrtSimples = 100
    let qrtDuplo = 200
    let qrtSuite = 300

    if(quartos === "Simples"){
        if(qntd <= 15){
            alert(`O valor total para ${qntd} quartos ${quartos}
é de: ${qntd * qrtSimples}`)
        } else {
            alert(`Sinto muito, a quantidade
informada de ${qntd} quartos ${quartos},
excede o total que temos disponível`)
        }
    } else if(quartos === "Duplo"){
        if(qntd <= 10){
            alert(`O valor total para ${qntd} quartos ${quartos}
é de: ${qntd * qrtDuplo}`)
        } else {
            alert(`Sinto muito, a quantidade
informada de ${qntd} quartos ${quartos},
excede o total que temos disponível`)
        }
    } else if (quartos === "Suíte"){
        if(qntd <= 5){
            alert(`O valor total para ${qntd} quartos ${quartos}
é de: ${qntd * qrtSuite}`)
        } else {
            alert(`Sinto muito, a quantidade
informada de ${qntd} quartos ${quartos},
excede o total que temos disponível`)
        }
    }
}


    function CorpoPg() {
        return (
            <div>
                <h1>Hotel</h1>
                <button onClick={reserva}>Reserva</button>
            </div>

        )
    }
    export default CorpoPg