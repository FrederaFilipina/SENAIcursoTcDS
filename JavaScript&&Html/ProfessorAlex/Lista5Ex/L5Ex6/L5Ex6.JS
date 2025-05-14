function rodPro() {
    let cC = 0
    let numV = 30
    let numDv = 3

    
    while(cC <= numV){
        
        let resp = cC / numDv        

        if(Number.isInteger(resp)){
            alert(`${cC} é um número divisivel por ${numDv},
pois o quociente da sua divisão
que é: ${resp} é um número inteiro`)
        }

        cC++
    }   

    alert(`FIM! Obrigado^^`)
}