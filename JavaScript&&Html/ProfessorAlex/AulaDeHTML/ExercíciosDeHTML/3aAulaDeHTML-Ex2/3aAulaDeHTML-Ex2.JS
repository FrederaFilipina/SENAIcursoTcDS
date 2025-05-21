function rodPro() {
    let nota1 = Number(document.getElementById("notaProva1").value)
    let peso1 = Number(document.getElementById("pesoProva1").value)

    let nota2 = Number(document.getElementById("notaProva2").value)
    let peso2 = Number(document.getElementById("pesoProva2").value)

    let nota3 = Number(document.getElementById("notaProva3").value)
    let peso3 = Number(document.getElementById("pesoProva3").value)

    let nota4 = Number(document.getElementById("notaProva4").value)
    let peso4 = Number(document.getElementById("pesoProva4").value)

    let media = document.getElementById("mediaNota")
    let mediacal = ((nota1 * peso1) + (nota2 * peso2) + (nota3 * peso3) + (nota4 * peso4)) / (peso1 + peso2 + peso3 + peso4)

    media.innerText = ` Valor da média final é de: ${mediacal}

    ${nota1} + ${peso1} = ${nota1 * peso1}
    ${nota2} + ${peso2} = ${nota2 * peso2}
    ${nota3} + ${peso3} = ${nota3 * peso3}
    ${nota4} + ${peso4} = ${nota4 * peso4}
    ${(nota1 * peso1) + (nota2 * peso2) + (nota3 * peso3) + (nota4 * peso4)} / ${(peso1 + peso2 + peso3 + peso4)}`
}