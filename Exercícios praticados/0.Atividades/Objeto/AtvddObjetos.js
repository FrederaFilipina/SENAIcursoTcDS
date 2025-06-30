// >> Exercícios com Objetos --------------------------------------------------------------

/* 01. Catálogo de Produtos - Crie um array com objetos representando produtos de uma loja.
Implemente uma função que recebe um nome e retorna o produto correspondente.*/
const prodsLoja = [
    { categoria: "Higiene pessoal", produto: "Sabonetes", valor: 3.50 },
    { categoria: "Higiene pessoal", produto: "Shampoos", valor: 12.90 },
    { categoria: "Higiene pessoal", produto: "Condicionadores", valor: 13.50 },
    { categoria: "Higiene pessoal", produto: "Pasta de dentes", valor: 4.80 },
    { categoria: "Higiene pessoal", produto: "Escovas de cabelo", valor: 10.00 },
    { categoria: "Higiene pessoal", produto: "Desodorantes", valor: 9.90 },
    { categoria: "Higiene pessoal", produto: "Algodão", valor: 2.50 },
    { categoria: "Higiene pessoal", produto: "Papel higiênico", valor: 6.00 }
    ,

]

function rodProg1() {
    let nomeProd = prompt(`Digite o produto que você busca: `)
    let vltProd = prodsLoja.find(prodLoja => prodLoja.produto === nomeProd)
    alert(JSON.stringify(vltProd))
}


/* 02. Sistema de Biblioteca - Crie um objeto  livro  com título, autor e status de empréstimo.
Implemente métodos  emprestar()  e  devolver()  que atualizam o status*/
const livroBbteca = {
    Título: "Dom Casmurro", Autor: "Machado de Assis", Status: "Disponível",
    Emprestado: function () {
        if (this.Status === "Disponível") {
            this.Status = 'Emprestado'
            alert(`Você acabe de pegar o livro ${this.Título} emprestado`)
        }
        else {
            alert(`Este livro ${this.Título} encontra-se emprestado`)
        }
    },
    Devolvendo: function () {
        if (this.Status === "Emprestado") {
            this.Status = 'Disponível'
            alert(`Obrigado por devolver o livro ${this.Título}`)
        }
        else {
            alert(`Este livro ${this.Título} encontra-se disponível`)
        }
    }
}

function Emprestado() {
    livroBbteca.Emprestado()
    let dvlvrInf = document.getElementById('Livro')
    dvlvrInf.innerHTML = JSON.stringify(livroBbteca)

}
function Devolvendo() {
    livroBbteca.Devolvendo()
    let dvlvrInf = document.getElementById('Livro')
    dvlvrInf.innerHTML = JSON.stringify(livroBbteca)
}


/*03. Conversor de Temperatura - Crie um objeto com métodos celsiusParaFahrenheit e
fahrenheitParaCelsius, que retornem os valores convertidos.*/
const tempCF = {
    Cidade: 'Floripa',
    TempC: function () {
        let cTemp = prompt(`Quantos graus Celcius está agora?`)
        let convF = (cTemp * 1.8) + 32
        alert(`${cTemp}°C equivale a ${convF}°F `)
    },
    TempF: function () {
        let fTemp = prompt(`Quantos graus Fahrenheit está agora?`)
        let convC = Math.round((fTemp - 32) / 1.8)
        alert(`${fTemp}°F equivale a ${convC}°C `)
    }
}

function CpF() {
    tempCF.TempC()
}
function FpC() {
    tempCF.TempF()
}


/*04. Agenda de Contatos - Crie um objeto agenda que contenha uma lista de contatos.
Implemente funções para adicionar, remover e listar contatos*/
const agenda = {
    cnts: [
        { nome: 'C', tel: 111, email: '@EU.com.br' },
        { nome: 'B', tel: 222, email: '@TU.com.br' },
        { nome: 'A', tel: 222, email: '@TU.com.br' }],
}

function addCont() {
    let contNome = prompt(`Nome:`)
    let contTel = prompt(`Tel:`)
    let contEmail = prompt(`email:`)
    agenda.cnts.push({ nome: `${contNome}`, tel: `${contTel}`, email: `${contEmail}` })
    let addsConts = document.getElementById('Agenda')
    addsConts.innerHTML = JSON.stringify(agenda)
}
function rmverCont() {
    let contNome = prompt(`Nome:`)
    let nomeCont = agenda.cnts.findIndex(cnts => cnts.nome === `${contNome}`)
    if (nomeCont != -1) {
        agenda.cnts.splice(nomeCont, 1)
    }
    let remversConts = document.getElementById('Agenda')
    remversConts.innerHTML = JSON.stringify(agenda)
}
function ordnrCont() {
    let array = agenda.cnts
    console.log(JSON.stringify(array))
    let ordernar = array.sort((nomeA, nomeZ) => {
        if (nomeA.nome < nomeZ.nome) {
            return -1
        }
        if (nomeA.nome > nomeZ.nome) {
            return 1
        }
        return 0
    })
    let ordnrConts = document.getElementById('Agenda')
    ordnrConts.innerHTML = JSON.stringify(ordernar)
}


/*05. Relatório de Notas - Crie um objeto  aluno  com notas em várias disciplinas.
Implemente um método media() que retorna a média geral*/
const aluno = {
    matematica: 8.5, portugues: 7.2, historia: 9.0, ciencias: 8.0, ingles: 6.8,
    Media: function () {
        let arrayMtrs = Object.keys(aluno).filter(materias => typeof (aluno[materias]) != 'function')
            .map(nota => aluno[nota])
            .reduce((notaAcumulada, notaMateria) => notaAcumulada + notaMateria, 0)
        let arrayTamanho = Object.keys(aluno).filter(matéria => typeof (aluno[matéria]) != 'function').length
        return (arrayMtrs / arrayTamanho)
    },
}

let dvlvrNotas = document.getElementById('Nota')
dvlvrNotas.innerHTML = JSON.stringify(aluno)
function Media() {
    aluno.Media()
    let dvlvrMedia = document.getElementById('Nota')
    dvlvrMedia.innerHTML = JSON.stringify(aluno, aluno.Media)
}


/*06. Carrinho de Compras - Implemente um objeto carrinho com um array de itens.
Cada item tem nome, quantidade e valor. Crie métodos para adicionarItem, removerItem e total.*/
const carrinho = {
    lstCompras: [
        { nome: "Maçã", und: 3, valor: 6.00 },
        { nome: "Pão", und: 2, valor: 14.00 },
        { nome: "Leite", und: 1, valor: 7.00 }
    ],
    onLista: function () {
        let itemNome = prompt(`Nome:`)
        let itemUnd = prompt(`Und:`)
        let itemValor = Number(prompt(`Valor:`))
        carrinho.lstCompras.push({ nome: `${itemNome}`, und: `${itemUnd}`, valor: `${itemValor}` })

        let dvlvrNovosIntens = document.getElementById('Compras')
        dvlvrNovosIntens.innerHTML = JSON.stringify(carrinho)

    },
    offLista: function () {
        let rmvrItem = prompt(`Nome:`)
        let itemRmvr = carrinho.lstCompras.findIndex(lstCompras => lstCompras.nome === rmvrItem)
        if (itemRmvr != -1) {
            carrinho.lstCompras.splice(itemRmvr, 1)
        }
        let dvlvrLista = document.getElementById('Compras')
        dvlvrLista.innerHTML = JSON.stringify(carrinho)
    },
    lstTtl() {
        let arrayCompras = carrinho.lstCompras.map(itens => Number(itens.valor))
            .reduce((ttlAcumulado, proximoItem) => ttlAcumulado + proximoItem, 0)
        return arrayCompras
    }
}

let lstOriginal = document.getElementById('Compras')
lstOriginal.innerHTML = JSON.stringify(carrinho)
function onLista() {
    carrinho.onLista()
    let dvlvrNovoItem = document.getElementById('Compras')
    dvlvrNovoItem.innerHTML = JSON.stringify(carrinho)
}
function offLista() {
    carrinho.offLista()
    let dvlvrNovoItem = document.getElementById('Compras')
    dvlvrNovoItem.innerHTML = JSON.stringify(carrinho)

}
function lstTtlt() {
    carrinho.lstTtl()
    let dvlvrTtlCompras = document.getElementById('Compras')
    dvlvrTtlCompras.innerHTML = JSON.stringify(carrinho, carrinho.lstTtl)
}


/*07. Filtrar Alunos Aprovados - Dado um array de objetos alunos,
filtre apenas os que têm média acima de 6 e retorne seus nomes. */
const alunos = [
    { nome: "Ana", nota: 9.2 },
    { nome: "Bruno", nota: 7.8 },
    { nome: "Carla", nota: 6.5 },
    { nome: "Diego", nota: 8.0 },
    { nome: "Eduarda", nota: 5.5 },
    { nome: "Felipe", nota: 6.9 },
    { nome: "Gabriela", nota: 9.5 },
    { nome: "Henrique", nota: 7.3 },
    { nome: "Isabela", nota: 10.0 },
    { nome: "João", nota: 5.6 },
    { nome: "Karla", nota: 8.2 },
    { nome: "Leonardo", nota: 9.0 },
    { nome: "Mariana", nota: 7.1 },
    { nome: "Nicolas", nota: 6.0 },
    { nome: "Olívia", nota: 8.8 }
]
let lstAlunos = document.getElementById('Aprovados')
lstAlunos.innerHTML = JSON.stringify(alunos)

function lstAprovados(){
    let notaAprovação = Number(prompt(`Qual a nota de corte?`))

    let notasOK = alunos.filter(aprovados => aprovados.nota > notaAprovação)
    .map(nomes => {
    let nome = Object.keys(nomes)
    return nome.filter(nomeApv => nomeApv === 'nome').map(nomeApv =>nomes[nomeApv])
    })
    let lstAlunos = document.getElementById('Aprovados')
    lstAlunos.innerHTML = JSON.stringify(notasOK)
}


// >> ----------------------------------------------------------
