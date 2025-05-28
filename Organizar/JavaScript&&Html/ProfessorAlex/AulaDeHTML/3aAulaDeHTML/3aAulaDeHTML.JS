function cadastrar(){
    let nome = document.getElementById("name").value
    let idade = document.getElementById("age").value
    let tagresultado = document.getElementById("resultado")

    tagresultado.innerText = `Bem vindo ao nosso sistema
    ${nome}, você tem ${idade} anos.
    
    É um prazer ter você aqui!`
}