function mostrarMenu() {
    document.getElementById('menuPessoalEstendido').style.display = "flex"
    document.getElementById('menuPessoalRecolhido').style.display = "none"
}

function esconderMenu() {
    document.getElementById('menuPessoalEstendido').style.display = "none"
    document.getElementById('menuPessoalRecolhido').style.display = "flex"
}

setInterval(esconderMenu, 7000)