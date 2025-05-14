/*6, 12, 18, 24, 30, 36, 42, 48, 54,
60, 66, 72, 78, 84, 90, 96*/
function rodPro() {
    let numF = 100
    for (let numI = 1; numI <= numF; numI++) {
        let numPar = numI % 2
        let numMult = Number.isInteger(numI / 3)
        console.log(`número: ${numI}, resto: ${numPar} e inteiro: ${numMult}`)

        if(numPar == 0 && numMult == true){
            alert(`O número ${numI} é Par e Multiplo de 3`)
        }
    }
    alert(`FIM!!! Obrigado ^^`)
}