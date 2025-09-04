import { useState } from "react"

function Ex2(){
    const[nota1, setNota1] = useState()
    const[nota2, setNota2] = useState()
    const[notaF, setcalcNota] = useState()

    function infNotas(){
        let nota1 = Number(prompt("Informe a primeira nota: "))
        let nota2 = Number(prompt("Informe a segunda nota: "))
        setNota1 (nota1)
        setNota2 (nota2)
    }
    function calcNota(){
        let notaF = (nota1 + nota2) / 2
        alert(`Sua média é de: ${notaF}`)
        setcalcNota(notaF)
    }
    function medFinal(){
        if(9 < notaF){
            alert("Sua média final foi: A")
        } else if (7.5 < notaF && notaF <= 9){
            alert("Sua média final foi: B")
        } else if (6 < notaF && notaF <= 7.5){
            alert("Sua média final foi: C")
        } else if (4 < notaF && notaF <= 6){
            alert("Sua média final foi: D")
        } else if (0 <= notaF && notaF <= 4) {
            alert("Sua média final foi: E")
        }

    }


    return(
        <div>
            <p>Ex 5.24 </p>
            <button onClick={infNotas}>Informar Notas</button>
            {(nota1 && nota2) && <button onClick={calcNota}>Calcular Média</button>}
            {notaF && <button onClick={medFinal}>Média Final</button>}
        </div>
    )
}
export default Ex2