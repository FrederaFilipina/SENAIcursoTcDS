const numeros = [5, 12, 8, 130, 44, 7, 3, 19, 22];
const nomes = ["Ana", "Carlos", "Beatriz", "Daniel", "Eduarda", "Bruno"];
const produtos = [
    {nome: "Camiseta", preco: 29.9, categoria: "Roupas"},
    {nome: "Notebook", preco: 2500, categoria: "Eletrônicos"},
    {nome: "Mouse", preco: 59.9, categoria: "Eletrônicos"},
    {nome: "Meias", preco: 9.9, categoria: "Roupas"},
    {nome: "Teclado", preco: 120, categoria: "Eletrônicos"}
];


// >> Exercícios com Números ---------------------------------------------------------
console.log(`Exercícios com Números --------------------------------------------------`)

//Exercício 01 -  Filtrar números maiores que 10
let numMaiorX = numeros.filter(num => num >10)
console.log(`Exercício 01 - Filtrar números maiores que 10
${numMaiorX}`)

//Exercício 02 - Dobrar todos os números do array
let numDobro = numeros.map(num => num * 2)
console.log(`Exercício 02 - Dobrar todos os números do array
${numDobro}`)

//Exercício 03 -  Somar todos os números do array
let numSoma = numeros.reduce((valorAcumulado, proximoValor) => valorAcumulado + proximoValor,0)
console.log(`Exercício 03 - Somar todos os números do array
${numSoma}`)

//Exercíco 04 - Encontrar o maior número
let maiorNum = Math.max(...numeros)
console.log(`Exercício 04 - Encontrar o maior número
${maiorNum}`)

//Exercício 05 - Encontrar o menor número
let menorNum = Math.min(...numeros)
console.log(`Exercício 05 - Encontrar o menor número
${menorNum}`)

//Exercício 06 - Ordenar os números em ordem crescente
let numCresc = numeros.sort((valorAtual, proximoValor) => valorAtual - proximoValor,0)
console.log(`Exercício 06 - Ordenar os números em ordem crescente
${numCresc}`)

//Exercício 07 - Criar um novo array com apenas os números ímpares
let numImpar = numeros.filter(impar => (impar % 2) !=0 ,0)
console.log(`Exercício 07 - Criar um novo array com apenas os números ímpares
${numImpar}`)

//Exercício 08 - Verificar se todos os números são maiores que 3
let numsMaiorIII = numeros.every(num => num > 3) ? `Sim` : `Não`
console.log(`Exercício 08 - Verificar se todos os números são maiores que 3
${numsMaiorIII}`)

//Exercício 09 - Verificar se existe algum número maior que 100
let numsMaiorC = numeros.find(num => num > 100) ? `Sim` : `Não`
console.log(`Exercício 09 - Verificar se existe algum número maior que 100
${numsMaiorC}`)

// Exercício 10 - Retornar a média dos números
let numsMedia = numeros.reduce((acumulador, valorAtual) => acumulador + valorAtual)/numeros.length
console.log(`Exercício 10 - Retornar a média dos números
${numsMedia} ou arredondando ${Math.round(numsMedia)}`)



// >> Exercícios com Nomes ---------------------------------------------------------
console.log(`Exercícios com Nomes --------------------------------------------------`)

// Exercício 01 - Ordenar os nomes em ordem alfabética
let nomesAZ = nomes.sort((nomeA, nomeZ) => nomeA.localeCompare(nomeZ))
console.log(`Exercício 01 - Ordenar os nomes em ordem alfabética
${nomesAZ}`)

// Exercício 02 -  Filtrar os nomes com mais de 5 letras
let qntLetras = 5
let nomesVLetras = nomes.filter(nomeTamanho => nomeTamanho < nomeTamanho.length)
console.log(`Exercício 02 - Filtrar os nomes com mais de 5 letras
${nomesVLetras}`)

// Exercício 03 - Transformar todos os nomes em letras minúsculas
let nomesMAIUSCULAS = nomes.map(letrasMaiusculas => letrasMaiusculas.toUpperCase())
console.log(`Exercício 03 - Transformar todos os nomes em letras minúsculas
${nomesMAIUSCULAS}`)

// Exercício 04 - Verificar se algum nome começa com a letra “Bˮ
let nomeLetraB = nomes.find(letraB => letraB.startsWith(`B`)) ? `Sim` : `Não`
console.log(`Exercício 04 - Verificar se algum nome começa com a letra “Bˮ
${nomeLetraB}`)

// Exercício 05 - Encontrar o nome “Danielˮ no array
let nomeDaniel = nomes.indexOf(`Daniel`)
console.log(`Exercício 05 - Encontrar o nome “Danielˮ no array
posiçao ${nomeDaniel}`)

// Exercício 06 - Criar um array com a quantidade de letras de cada nome
let qntLetrasNomes = nomes.map(qntLetras => qntLetras.length)
console.log(`Exercício 06 - Criar um array com a quantidade de letras de cada nome
${qntLetrasNomes}`)

// Exercício 07 - Juntar todos os nomes em uma string separada por vírgula
let nomesVirgulas = nomes.join(`,`)
console.log(`Exercício 07 - Juntar todos os nomes em uma string separada por vírgula
${nomesVirgulas}`)



// >> Exercícios com Produtos ---------------------------------------------------------
console.log(`Exercícios com Produtos --------------------------------------------------`)

// Exercício 01 -  Filtrar os produtos da categoria “Eletrônicosˮ
let catProd = produtos.filter(prodCat => prodCat.categoria === "Eletrônicos")
console.log(`Exercício 01 - Filtrar os produtos da categoria “Eletrônicosˮ
${JSON.stringify(catProd)}`)

//Exercício 02 - Criar um array apenas com os nomes dos produtos
let nomesProd = produtos.map(prodNome => prodNome.nome)
console.log(`Exercício 02 - Criar um array apenas com os nomes dos produtos
${(nomesProd)}`)

//Exercício 03 - Criar um array com os preços com desconto de 10%
let descProd = produtos.map(prodPrec => (prodPrec.preco - ((prodPrec.preco * 10)/100)).toFixed(2))
console.log(`Exercício 03 - Criar um array com os preços com desconto de 10%
${(descProd)}`)

//Exercício 04 - Calcular o valor total de todos os produtos
let valorTtlProd = produtos.reduce((valorAcumulado, produto)=> valorAcumulado + produto.preco,0)
console.log(`Exercício 04 - Calcular o valor total de todos os produtos
${(valorTtlProd.toFixed(2))}`)

//Exercício 05 -  Encontrar o produto mais caro
let maiorValorProd = produtos.reduce((max, valor) => Math.max(max, valor.preco),0)
console.log(`Exercício 05 - Encontrar o produto mais caro
${(maiorValorProd)}`)

//Exercício 06 - Ordenar os produtos do mais barato ao mais caro
let crescProd = produtos.sort((prodAtual, proxProd) => prodAtual.preco - proxProd.preco,0)
console.log(`Exercício 06 - Ordenar os produtos do mais barato ao mais caro
${JSON.stringify(crescProd)}`)

//Exercício 07 - Agrupar os produtos por categoria
let catsProd = produtos.reduce((catAcumulador, prodsCat) =>{
    let listaProd = prodsCat.categoria
    if(!catAcumulador[listaProd]){
        catAcumulador[listaProd]=[]
    }
    catAcumulador[listaProd].push(prodsCat)
    return catAcumulador
}, {})
console.log(`Exercício 07 - Agrupar os produtos por categoria
${JSON.stringify(catsProd)}`)

//Exercício 08 -  Criar uma função que receba uma categoria e retorne os produtos dela
let pesquisa = `Eletrônicos`
let pesqProd = produtos.filter(pesqProd => pesqProd.categoria === pesquisa)
console.log(`Exercício 08 -  Criar uma função que receba uma categoria e retorne os produtos dela
${JSON.stringify(pesqProd)}`)

//Exercício 09 - Criar um array com objetos apenas contendo nome e preço
let novoArryNomePreco = produtos.map(prodNomePreco =>{
    return{
        nome: prodNomePreco.nome,
        preco: prodNomePreco.preco
    }
})
console.log(`Exercício 09 - Criar um array com objetos apenas contendo nome e preço
${JSON.stringify(novoArryNomePreco)}`)

//Exercício 10- Verificar se todos os produtos custam mais de R$ 5
let valorMaisV = produtos.every(valor => valor.preco > 5.00) ? `Sim` : `Não`
console.log(`Exercício 10- Verificar se todos os produtos custam mais de R$ 5
${JSON.stringify(valorMaisV)}`)