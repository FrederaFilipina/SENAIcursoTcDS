function rodPro(){
    let nota1 = Number(document.getElementById("notaProva1").value)
    let nota2 = Number(document.getElementById("notaProva2").value)
    let nota3 = Number(document.getElementById("notaProva3").value)
    let nota4 = Number(document.getElementById("notaProva4").value)
    //let media = document.getElementById("mediaNota")
    let mediacal = (nota1 + nota2 + nota3 + nota4) / 4

    mediaNota.innerText = `${mediacal}`
}