function mostrarInf() {
    document.getElementById('infPessoalEstendido').style.display = "flex"
    document.getElementById('infPessoalRecolhido').style.display = "none"
}

function esconderInf() {
    document.getElementById('infPessoalEstendido').style.display = "none"
    document.getElementById('infPessoalRecolhido').style.display = "flex"
}

setInterval(esconderInf, 7000)
