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
const livroBbteca = { Título: "Dom Casmurro", Autor: "Machado de Assis", Status: "Disponível",
    Emprestado: function(){
        if(this.Status === "Disponível"){
            this.Status = 'Emprestado'
            alert(`Você acabe de pegar o livro ${this.Título} emprestado`)
        }
        else{
            alert(`Este livro ${this.Título} encontra-se emprestado`)
        }
    },
    Devolvendo: function(){
        if(this.Status === "Emprestado"){
            this.Status = 'Disponível'
            alert(`Obrigado por devolver o livro ${this.Título}`)
        }
        else{
            alert(`Este livro ${this.Título} encontra-se disponível`)
        }
    }
}

function Emprestado(){
    livroBbteca.Emprestado()
    let dvlvrInf = document.getElementById('Livro')
    dvlvrInf.innerHTML = JSON.stringify(livroBbteca)

}
function Devolvendo(){
    livroBbteca.Devolvendo()
    let dvlvrInf = document.getElementById('Livro')
    dvlvrInf.innerHTML = JSON.stringify(livroBbteca)
}


/*03. Conversor de Temperatura - Crie um objeto com métodos celsiusParaFahrenheit e
fahrenheitParaCelsius, que retornem os valores convertidos.*/
const tempCF = {Cidade: 'Floripa',
    TempC: function(){
        let cTemp = prompt(`Quantos graus Celcius está agora?`)
        let convF = (cTemp * 1.8)+32
        alert(`${cTemp}°C equivale a ${convF}°F `)
    },
    TempF: function(){
        let fTemp = prompt(`Quantos graus Fahrenheit está agora?`)
        let convC = Math.round((fTemp - 32)/1.8)
        alert(`${fTemp}°F equivale a ${convC}°C `)
    }
}

function CpF(){
    tempCF.TempC()
}
function FpC(){
    tempCF.TempF()
}


/*04. Agenda de Contatos - Crie um objeto agenda que contenha uma lista de contatos.
Implemente funções para adicionar, remover e listar contatos*/
const agenda = {
    cnts:[
        {nome: 'C', tel: 111, email: '@EU.com.br'},
        {nome: 'B', tel: 222, email: '@TU.com.br'},
        {nome: 'A', tel: 222, email: '@TU.com.br'}],  
}
function addCont(){
    let contNome = prompt(`Nome:`)
    let contTel = prompt(`Tel:`)
    let contEmail = prompt(`email:`)
    agenda.cnts.push({nome: `${contNome}`, tel: `${contTel}`, email: `${contEmail}`})
    let addsConts = document.getElementById('Agenda')
    addsConts.innerHTML = JSON.stringify(agenda)
}

function rmverCont(){
    let contNome = prompt(`Nome:`)
    let nomeCont = agenda.cnts.findIndex(cnts => cnts.nome === `${contNome}`)
    if(nomeCont != -1){
        agenda.cnts.splice(nomeCont, 1)
    }
    let remversConts = document.getElementById('Agenda')
    remversConts.innerHTML = JSON.stringify(agenda)
}

function ordnrCont(){
    let array = agenda.cnts
    console.log(JSON.stringify(array))
    let ordernar = array.sort((nomeA, nomeZ) => {
        if(nomeA.nome <nomeZ.nome){
            return -1
        }
        if (nomeA.nome > nomeZ.nome){
            return 1
        }
        return 0
    })
    let ordnrConts = document.getElementById('Agenda')
    ordnrConts.innerHTML = JSON.stringify(ordernar )
}
