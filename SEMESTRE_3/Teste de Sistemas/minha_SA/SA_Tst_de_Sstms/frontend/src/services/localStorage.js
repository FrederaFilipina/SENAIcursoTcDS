// MORADORES

export function getMoradores() {

    return JSON.parse(
        localStorage.getItem('moradores')
    ) || []
}

export function saveMoradores(moradores) {

    localStorage.setItem(
        'moradores',
        JSON.stringify(moradores)
    )
}


// RECADOS

export function getRecados() {

    return JSON.parse(
        localStorage.getItem('recados')
    ) || []
}

export function saveRecados(recados) {

    localStorage.setItem(
        'recados',
        JSON.stringify(recados)
    )
}


// LOGIN

export function setUsuarioLogado(usuario) {

    localStorage.setItem(
        'usuarioLogado',
        JSON.stringify(usuario)
    )
}

export function getUsuarioLogado() {

    return JSON.parse(
        localStorage.getItem('usuarioLogado')
    )
}

export function logout() {

    localStorage.removeItem('usuarioLogado')
}