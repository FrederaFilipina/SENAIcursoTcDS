const numeros = [5, 12, 8, 130, 44, 7, 3, 19, 22];
const nomes = ["Ana", "Carlos", "Beatriz", "Daniel", "Eduarda", "Bruno"];
const produtos = [
    { nome: "Camiseta", preco: 29.9, categoria: "Roupas" },
    { nome: "Notebook", preco: 2500, categoria: "Eletrônicos" },
    { nome: "Mouse", preco: 59.9, categoria: "Eletrônicos" },
    { nome: "Meias", preco: 9.9, categoria: "Roupas" },
    { nome: "Teclado", preco: 120, categoria: "Eletrônicos" }];


// >> Exercícios com Números ---------------------------------------------------------

console.log(`Arrays Numeros: ${numeros}`)

//Exercício 01 -  Filtrar números maiores que 10
let numMaiorX = numeros.filter(num => num >10)
console.log(`Exercício 1 - Filtrar números maiores que 10
${numMaiorX}`)

//Exercício 02 - Dobrar todos os números do array
let numDobro = numeros.map(num => num * 2)
console.log(`Exercício 2 - Dobrar todos os números do array
${numDobro}`)

//Exercício 03 -  Somar todos os números do array
let numSoma = numeros.reduce((valorAcumulado, proximoValor) => valorAcumulado + proximoValor,0)
console.log(`Exercício 3 - Somar todos os números do array
${numSoma}`)

//Exercíco 04 - Encontrar o maior número
let maiorNum = Math.max(...numeros)
console.log(`Exercício 4 - Encontrar o maior número
${maiorNum}`)

//Exercício 05 - Encontrar o menor número
let menorNum = Math.min(...numeros)
console.log(`Exercício 5 - Encontrar o menor número
${menorNum}`)

//Exercício 06 - Ordenar os números em ordem crescente
let numCresc = numeros.sort((valorAtual, proximoValor) => valorAtual - proximoValor,0)
console.log(`Exercício 6 - Ordenar os números em ordem crescente
${numCresc}`)

//Exercício 07 - Criar um novo array com apenas os números ímpares
let numImpar = numeros.filter(impar => (impar % 2) !=0 ,0)
console.log(`Exercício 7 - Criar um novo array com apenas os números ímpares
${numImpar}`)

//Exercício 08 - Verificar se todos os números são maiores que 3
let numsMaiorIII = numeros.every(num => num > 3) ? `Sim` : `Não`
console.log(`Exercício 8 - Verificar se todos os números são maiores que 3
${numsMaiorIII}`)

//Exercício 09 - Verificar se existe algum número maior que 100
let numsMaiorC = numeros.find(num => num > 100) ? `Sim` : `Não`
console.log(`Exercício 9 - Verificar se existe algum número maior que 100
${numsMaiorC}`)

// Exercício 10 - Retornar a média dos números
let numsMedia = numeros.reduce((acumulador, valorAtual) => acumulador + valorAtual)/numeros.length
console.log(`Exercício 10 - Retornar a média dos números
${numsMedia} ou arredondando ${Math.round(numsMedia)}`)



// >> Exercícios com Nomes ---------------------------------------------------------

// Exercício 01