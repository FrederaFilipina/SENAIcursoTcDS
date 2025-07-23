/*01 - Contador Persistente
Crie um contador com botões “+ˮ e “−ˮ. O número deve ser 
salvo no localStorage e restaurado ao recarregar a página*/
let cC = {
    valor: 0,
    somar: function () {
        this.valor += 1

    },
    diminuir: function () {
        this.valor -= 1
    },
    salvar: function () {
        localStorage.setItem('cC', this.valor)
    },
    atualizar: function () {
        let cCSalvo = localStorage.getItem('cC')
        this.valor = cCSalvo != null ? parseInt(cCSalvo) : 0
    }
}
let valorcC = document.getElementById('valorcC')
valorcC.innerHTML = `${cC.valor}`
function somar() {
    cC.somar()
    console.log(cC.valor)
}
function diminuir() {
    cC.diminuir()
    console.log(cC.valor)
}
function salvar() {
    cC.salvar()
}
function atualizar() {
    cC.atualizar()
    let valorcC = document.getElementById('valorcC')
    valorcC.innerHTML = `O Valor do Contador Resgatado: ${cC.valor}`

}


/*02 - Texto Salvo
Crie um <textarea> onde o texto digitado seja salvo 
automaticamente no localStorage a cada digitação.
Aorecarregar a página, o texto deve reaparecer*/
let textodig = document.getElementById('areatexto')
textodig.addEventListener('input', function () {
    localStorage.setItem('texto', textodig.value)
})
window.onload = function () {
    let campTexto = localStorage.getItem('texto')
    if (campTexto != null) {
        textodig.value = campTexto
    }
}


/*03 - Checkbox Persistente
Faça uma lista de tarefas com checkboxes. Ao marcar uma 
tarefa como feita, essa informação deve ser salva no 
localStorage.*/
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || []
function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
}
function marcarTarefas() {
    const lista = document.getElementById("listaTarefas");
    lista.innerHTML = ""

    tarefas.forEach((tarefa, index) => {
        const li = document.createElement("li")

        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.checked = tarefa.concluida
        checkbox.onchange = function () {
            tarefas[index].concluida = checkbox.checked
            salvarTarefas()
        };

        const texto = document.createElement("span")
        texto.textContent = tarefa.texto
        if (tarefa.concluida) {
            texto.style.textDecoration = "line-through"
        }

        li.appendChild(checkbox)
        li.appendChild(texto)
        lista.appendChild(li)
    })
}
function adicionarTarefa() {
    const input = document.getElementById("novaTarefa")
    const texto = input.value.trim();

    if (texto !== "") {
        tarefas.push({ texto: texto, concluida: false })
        input.value = ""
        salvarTarefas()
        marcarTarefas()
    }
}


/*04 - Nome do Usuário
Ao acessar a página, pergunte o nome do usuário (via prompt 
ou input). Salve esse nome e cumprimente o usuário nas 
visitas seguintes: “Olá, [nome]!*/
let nome = localStorage.getItem('nome')
function nomeUsuario() {
    if (nome == null) {
        nome = prompt(`Diga seu nome`)
        localStorage.setItem('nome', JSON.stringify(nome))
    }
}
if (nome != null) {
    window.onload = alert(`Olá [${nome}]`)
}


/*05 - Escolha de Cor
Crie três botões com cores diferentes. Quando o usuário clicar 
em uma cor, o fundo da página muda e essa preferência é 
salva no localStorage!*/
let corAtual = document.getElementById('corFundo')
let corSalva = localStorage.getItem('corTela')
if (corSalva) {
    corFundo.className = '' + corSalva
}
if (corSalva != `corP`) {
    function corA() {
        let corFundo = document.getElementById('corFundo')
        corFundo.className = 'corA'
        localStorage.setItem('corTela', 'corA')
    }
    function corB() {
        let corFundo = document.getElementById('corFundo')
        corFundo.className = 'corB'
        localStorage.setItem('corTela', 'corB')
    }
    function corC() {
        let corFundo = document.getElementById('corFundo')
        corFundo.className = 'corC'
        localStorage.setItem('corTela', 'corC')
    }
}

/*06 - Modo Noturno
Adicione um botão “Modo Escuroˮ. Quando ativado, o fundo
e os textos da página mudam, e essa escolha é salva para
manter o tema mesmo após recarregar a página.*/
let modoNoturno = localStorage.getItem('modoNoturno')
function modoEscuro() {
    let corFundo = document.getElementById('corFundo')
    corFundo.className = 'corP'
    localStorage.setItem('corTela', 'corP')
}


/*07 - Visita Diária
Mostre uma mensagem como “Bem-vindo de volta!ˮ caso a última
visita tenha sido no mesmo dia, e “Saudades de você!ˮ se foi
em outro dia. Use localStorage para salvar a data*/
let dataHJ = new Date().getDate()
localStorage.setItem('datavst', dataHJ)
console.log(dataHJ, typeof(dataHJ))
let dataVst = Number(localStorage.getItem('datavst', dataHJ))
console.log(dataVst, typeof(dataVst))
if(dataHJ === dataVst){
    let msg = document.getElementById('msgUsuario')
    msg.innerHTML = `BEM VINDO DE VOLTA`
} else {
    let msg = document.getElementById('msgUsuario')
    msg.innerHTML = `Saudades de você`
}


/*08 - Última Visita
Salve a data e hora da última visita do usuário e mostre-a
ao entrar novamente na página: “Última visita: 29/06/2025 2230ˮ.*/
let msgVisita = document.getElementById('msgUsuario2')
let ultimaVst = localStorage.getItem('ultimaVisita')
if(ultimaVst){
    let msg2 = document.getElementById('msgUsuario2')
    msg2.innerHTML = `Sua ultima visita foi em: ${ultimaVst}`
}
let dataHora = new Date().toISOString().split('')[0]
localStorage.setItem('ultimaVisita', dataHora)


