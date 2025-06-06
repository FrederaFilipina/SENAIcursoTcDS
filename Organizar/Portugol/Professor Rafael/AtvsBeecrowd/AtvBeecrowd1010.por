/*Neste problema, deve-se ler o código de uma peça 1, o número de peças 1, o valor unitário de cada peça 1,
o código de uma peça 2, o número de peças 2 e o valor unitário de cada peça 2. Após, calcule e mostre o valor a ser pago.

Entrada: O arquivo de entrada contém duas linhas de dados. Em cada linha haverá 3 valores, respectivamente dois inteiros
e um valor com 2 casas decimais.

Saída: A saída deverá ser uma mensagem conforme o exemplo fornecido abaixo, lembrando de deixar um espaço após os
dois pontos e um espaço após o "R$". O valor deverá ser apresentado com 2 casas após o ponto.*/

programa {
  funcao inicio() {
  //Declaração das Variáveis
  inteiro peca1ID, pecaUn1, peca2ID, pecaUn2
  real pecaRS1, pecaRS2, pecasRSTtl


  //Entrada dos Dados
  escreva("Peça 01, ID: ") leia(peca1ID)
  escreva("Peça 01, quantas unidades: ") leia(pecaUn1)
  escreva("Peça 01, valor unitário R$: ") leia(pecaRS1)

  escreva("\nPeça 02, ID: ") leia(peca2ID)
  escreva("Peça 02, quantas unidades: ") leia(pecaUn2)
  escreva("Peça 02, valor unitário R$: ") leia(pecaRS2)


  //Processamento dos Dados
  pecasRSTtl = (pecaUn1 * pecaRS1) + (pecaUn2 * pecaRS2)


  //Saída dos Dados
  escreva("\nValor Total a pagar R$" + pecasRSTtl)
  
  }
}
