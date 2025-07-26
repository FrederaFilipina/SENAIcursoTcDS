const lista = [
    {
        nome: `HTML`,
        lst: [`A`, `B`, `C`]
    },

    {
        nome: `JS`,
        lst: [`D`, `E`, `F`]
    },

    {
        nome: `CSS`,
        lst: [`G`, `H`, `I`]
    }
]

function limparGeral() {
    document.querySelector('.area-lousa').innerHTML = ``
    document.querySelector('.menu-Lista').innerHTML = ``
}

function listaConteudo(parametro) {
    limparGeral()
    let conteudoNome = parametro
    let nomeConteudo
    nomeConteudo = lista.find(nomeLst => nomeLst.nome === conteudoNome)

    document.querySelector('.menu-Lista').innerHTML =
        `<div class="lista-NomeConteudo">
            <span>Lista de conteudo sobre ${nomeConteudo.nome}</span>
        </div>

    <div class="lista-LstConteudo">
    </div>`

    let cC = 0
    while (cC != nomeConteudo.lst.length) {
        document.querySelector('.lista-LstConteudo').innerHTML +=
            `<div onclick="abrirConteudoLousa('${nomeConteudo.lst[cC]}')" id="lstConteudo-Nome">
                ${nomeConteudo.lst[cC]}
            </div>`
        cC++
    }
}

function abrirConteudoLousa(cntdLousa) {
    let lousaCntd = cntdLousa

    document.querySelector('.area-lousa').innerHTML =
        `${lousaCntd}`

}