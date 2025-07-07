let nums = [1, 2, 3, 4]
let soma = nums.reduce((acumulador, valorAtual) => acumulador + valorAtual)
/*
*>> acumulador === É o valor agregado após a execução da função
*>> valorAtual === É o próximo valor referente ao elemento a ser computado na execução da função
*/
console.log(soma)

let mult = nums.reduce((acumulador, valorAtual) => acumulador * valorAtual)
console.log(mult)