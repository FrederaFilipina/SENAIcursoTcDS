let senhaF = `abc123`

function rodPro(){
    let senhaI
    let xVezes = 1
    
    while(senhaI != senhaF && xVezes <= 3){
        senhaI = prompt(`${xVezes} - Digite a senha:`)
        xVezes++
        if(senhaI == senhaF){
            alert(`Senha Correta!`)
        }
    }
    alert(`FIM!!! Obrigado ^^`)
}
