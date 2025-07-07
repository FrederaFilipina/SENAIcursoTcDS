function rodPro() {
    let numdig = Number(prompt(`Dígite qualquer valor`))
    let numPar = numdig % 2
    let num = numdig > -1 && numPar ==0 ? `${numdig} é Par e Positivo` : `Não é Par porém é positivo`;
    alert(num)
}