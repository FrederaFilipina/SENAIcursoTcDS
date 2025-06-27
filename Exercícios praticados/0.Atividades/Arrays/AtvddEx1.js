const numeros = [5, 12, 8, 130, 44, 7, 3, 19, 22];
const nomes = ["Ana", "Carlos", "Beatriz", "Daniel", "Eduarda", "Bruno"];
const produtos = [
    { nome: "Camiseta", preco: 29.9, categoria: "Roupas" },
    { nome: "Notebook", preco: 2500, categoria: "Eletrônicos" },
    { nome: "Mouse", preco: 59.9, categoria: "Eletrônicos" },
    { nome: "Meias", preco: 9.9, categoria: "Roupas" },
    { nome: "Teclado", preco: 120, categoria: "Eletrônicos" }];

//Exercício 1 -  Filtrar números maiores que 10
let numMaiorX = numeros.filter(num => num >10)
console.log(`Exercício 1: ${numMaiorX}`)

//Exercício 2 - Dobrar todos os números do array
let numDobro = numeros.map(num => num * 2)
console.log(`Exercício 2: ${numDobro}`)

//Exercício 3 -  Somar todos os números do array
let numSoma = numeros.reduce((valorAcumulado, proximoValor) => valorAcumulado + proximoValor,0)
console.log(`Exercício 3: ${numSoma}`)

//Exercíco 4 - Encontrar o maior número
let maiorNum = Math.max(...numeros)
console.log(`Exercício 4: ${maiorNum}`)

//Exercício 5 - Encontrar o menor número
let menorNum = Math.min(...numeros)
console.log(`Exercício 5: ${menorNum}`)

//Exercício 6 - Ordenar os números em ordem crescente
let numCresc = numeros.sort((valorAtual, proximoValor) => valorAtual - proximoValor,0)
console.log(`Exercício 6: ${numCresc}`)

//Exercício 7 - Criar um novo array com apenas os números ímpares
let numImpar = numeros.filter(impar => (impar % 2) !=0 ,0)
console.log(`Exercício 7: ${numImpar}`)

//Exercício 8 - Verificar se todos os números são maiores que 3
let numsMaiorIII = numeros.filter(num => num > 3)
console.log(`Exercício 8: ${numsMaiorIII}`)
