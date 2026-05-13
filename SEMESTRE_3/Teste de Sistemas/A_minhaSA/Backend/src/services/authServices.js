import { buscarUsuario } from '../repositories/authRepository.js'

export async function loginService({
    usuario,
    senha
}) {

    if (!usuario || !senha) {
        throw new Error('Usuário e senha são obrigatórios')
    }

    const morador = await buscarUsuario(usuario)

    if (!morador) {
        throw new Error('Usuário não encontrado')
    }

    if (morador.senha !== senha) {
        throw new Error('Senha inválida')
    }

    return {
        id: morador.id,
        nome: morador.nome,
        bloco: morador.bloco,
        num_ap: morador.num_ap,
        usuario: morador.usuario
    }
}