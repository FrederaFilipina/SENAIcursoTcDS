function rodPro(){
    let nome = document.getElementById("nomeUs").value
    let altura = Number(document.getElementById("altUs").value)
    let peso = Number(document.getElementById("pesoUs").value)

    let valor = document.getElementById("valorImc")
    console.log(valorImc)
    let imcCal = (peso / (altura*altura))

    valor.innerText = `${nome} seu IMC é de ${imcCal}`
}