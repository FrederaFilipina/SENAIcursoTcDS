import { criarMorador, listarMoradores, buscarMoradorPorId, atualizarMorador, deletarMorador } from '../repositories/moradoresRepository.js'


export async function createMoradorService({
    nome,
    bloco,
    num_ap,
    usuario,
    senha
}) {

    if (!nome || !bloco || !num_ap || !usuario) {
        throw new Error('Todos os campos são obrigatórios')
    }

    const novoMorador = await criarMorador({
        nome,
        bloco,
        num_ap,
        usuario,
        senha
    })

    return novoMorador
}//↪ Criar usuário de morador


export async function getMoradoresService() {

    const moradores = await listarMoradores()

    return moradores
}//↪ Ler todo os usuários criados


export async function getMoradorByIdService(id) {

    const morador = await buscarMoradorPorId(id)

    if (!morador) {
        throw new Error('Morador não encontrado')
    }

    return morador
}//↪ Ler um único usuário


export async function updateMoradorService(
    id,
    {
        nome,
        bloco,
        num_ap,
        usuario
    }
) {

    if (!nome || !bloco || !num_ap || !usuario) {
        throw new Error('Todos os campos são obrigatórios')
    }

    const moradorExistente = await buscarMoradorPorId(id)

    if (!moradorExistente) {
        throw new Error('Morador não encontrado')
    }

    const moradorAtualizado = await atualizarMorador(
        id,
        {
            nome,
            bloco,
            num_ap,
            usuario
        }
    )

    return moradorAtualizado
}//↪ Atualizar os dados de um único usuário


export async function deleteMoradorService(id) {

    const moradorExistente = await buscarMoradorPorId(id)

    if (!moradorExistente) {
        throw new Error('Morador não encontrado')
    }

    const moradorDeletado = await deletarMorador(id)
    return moradorDeletado
}//↪ Deletar o úsuario de um único modador