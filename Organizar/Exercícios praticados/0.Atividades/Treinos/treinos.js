//Comentário Padrão

// !!>     Comentário de Alerta
// !?>     Comentário de Alerta
// >>      Comentário de próximos passos
// **>     Comentário de funcionamento
// //      Comentário riscado

// //------------------------------------

const pessoa = {
    nome: "Fre",
    idade: 33,
    esportes: ["futebol", "natação", "yoga"],
    notas: [10, 9, 8],
    filmes: ["O Senhor dos Anéis - As Suas Torres", "Matrix", "Tenet"],
    livros: ["1984", "Dom Casmurro", "O Pequeno Príncipe"]
};

// >> Métodos Básicos de Manipulação:
console.log(`01)`, JSON.stringify(pessoa.esportes)) // Retorna os elementos do array 'espostes:' pertencente ao objeto 'pessoa'
console.log(`02)`, pessoa.esportes[2]) //Retorna apenas o elemento na posição [2]
console.log(`03)`, JSON.stringify(pessoa.esportes[2] = 'corrida')) // **> Faz com que a posição [2] passa a ter um novo elemento, porém não apaga o elemento no array original
console.log(`04)`, JSON.stringify(pessoa.esportes)) // Retorna os elementos de um novo array 'espostes:' pertencente ao objeto 'pessoa', com a alteração feita na linha anterior
console.log(`05)`, (pessoa.esportes).length, typeof((pessoa.esportes).length)) // **> Retorna o tamanho do array 'esportes' e informa que essa variavel é um número
console.log(`06)`, pessoa.esportes.push("ciclismo")) // **> O .push( ) cria no final do array uma nova posição[4] porém ele só funciona se algum elemento for atribuido no momento da sua criação
console.log(`07)`, JSON.stringify(pessoa.esportes)) // Retorna os elementos do array 'espostes:' pertencente ao objeto 'pessoa'
console.log(`08)`, pessoa.esportes.pop()) // **> O .pop() remove o elemento que está por último na lista do array, no caso é o >ciclismo<
console.log(`09)`, JSON.stringify(pessoa.esportes)) // Retorna os elementos do array 'espostes:' pertencente ao objeto 'pessoa'
console.log(`10`, pessoa.esportes.shift()) // **> O .shitf() remove o elemento que está por primeiro na lista do array >futebol<
console.log(`11)`, JSON.stringify(pessoa.esportes)) // Retorna os elementos do array 'espostes:' pertencente ao objeto 'pessoa'
console.log(`12)`, pessoa.esportes.unshift("vôlei")) // **> O .shitf() cria no início do array uma nova posição[0] porém ele só funciona se algum elemento for atribuido no momento da sua criação
console.log(`13)`, JSON.stringify(pessoa.esportes)) // Retorna os elementos do array 'espostes:' pertencente ao objeto 'pessoa'


// >> Métodos Intermediários e Modernos
pessoa.esportes.forEach(function(Elemento, Índice,  Array){ // **> Elemento = Retorna o nome do elemento, Índice = Retorna a posição do elemento dentro do aray, Array = Retorna o array da onde veio as informações
// **> O .forEach( ) percorre todos as posiçãoes de um array e retorna as respectivas informações que constam na função que foi passada
    console.log(`14) Elemento ${Elemento}, Posição ${Índice} e Array ${Array}`) // Retorna em forma de lista o que foi passado na função
})
pessoa.notas.forEach(function(Elemento){ 
// **> Com o resultado do .forEach() é possivel fazer alterações como por exemplo uma operação de soma, porém fica limitado a isso, não é criado um novo array e nem alterado os elementos dentro do array
    console.log(`15) Elemento ${Elemento} + 1 = ${Elemento + 1}`) // Retorna uma pequena operação
})

let notasX2 = pessoa.notas.map(nota => nota+1)
console.log(notasX2)
