// >> Exercícios com Objetos Parte 1 -----------------------------------------------------------------------------------------

/*01. Banco com Múltiplas Contas - Crie um objeto banco com várias contas.
Cada conta tem nome, saldo e métodos (depositar e sacar).
Implemente um relatório que mostre saldo total do banco.*/
const banco = {
    contas: [
        { nome: 'Ana Silva', saldo: 1500.75 },
        { nome: 'Carlos Souza', saldo: 3200.00 },
        { nome: 'Mariana Costa', saldo: 980.50 },
        { nome: 'João Lima', saldo: 500.00 },
        { nome: 'Fernanda Rocha', saldo: 2750.30 },
    ],
    sacar: function(){
        let nomeConta = prompt(`Informe o nome da conta:`)
        let contaNome = banco.contas.find(nome => nome.nome === nomeConta)
        alert (JSON.stringify(`Olá ${contaNome.nome}, seu saldo atual é de: R$ ${contaNome.saldo}`))

        let vlrSacar = Number(prompt(`Informe o valor que deseja sacar`))
        if(contaNome.saldo < vlrSacar){
            alert(`Saldo Insuficiente`)
        }
        else{
            contaNome.saldo -= vlrSacar
        }
        alert(`Olá ${contaNome.nome}, seu novo saldo é de: R$ ${contaNome.saldo}`) 
    },
    depositar: function(){
        let nomeConta = prompt(`Informe o nome da conta:`)
        let contaNome = banco.contas.find(nome => nome.nome === nomeConta)
        alert (JSON.stringify(`Olá ${contaNome.nome}, seu saldo atual é de: R$ ${contaNome.saldo}`))

        let vlrSacar = Number(prompt(`Informe o valor que deseja depositar`))
        contaNome.saldo += vlrSacar
        alert(`Olá ${contaNome.nome}, seu novo saldo é de: R$ ${contaNome.saldo}`)
    }
};

function sacar(){
    banco.sacar()
}

function depositar(){
    banco.depositar()
}

function saldoTtl(){
let saldoTtl = banco.contas.reduce((valorAc, sldConta) => valorAc + sldConta.saldo,0)
alert(saldoTtl)
}



/*02. Sistema de Votação - Crie um objeto que armazene votos por candidato.
Implemente funções para votar e retornar o candidato mais votado*/
const urna = {votoA: 0, votoB: 0, votoC:0}

function votarA(){
  urna.votoA ++
  console.log(`A recebeu: ${urna.votoA}, votos. ${typeof(urna.votoA)}`)
}
function votarB(){
  urna.votoB ++
  console.log(`B recebeu: ${urna.votoB}, votos`)
}
function votarC(){
  urna.votoC ++
 console.log(`C recebeu: ${urna.votoC}, votos`)
}

function resultado(){
    let vencedor
    let vencTemp

    if(urna.votoC < urna.votoA){
        vencTemp = `Candidato A`
    }
    else{
        vencTemp = Candidato A
    }
    if(vencTemp < urna.B){
        vencedor = urna.B
    } else{
        vencedor = vencTemp
    }
    console.log(vencTemp)
}

