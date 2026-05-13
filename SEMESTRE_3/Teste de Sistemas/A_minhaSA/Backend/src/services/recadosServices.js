import { criarRecado, listarRecados, buscarRecadoPorId, atualizarRecado, deletarRecado } from '../repositories/recadosRepository.js'


export async function createRecadoService({
    responsavel,
    tipo_recado,
    recado,
    status
}) {

    if (!responsavel || !tipo_recado || !recado) {
        throw new Error('Todos os campos obrigatórios devem ser preenchidos')
    }

    const novoRecado = await criarRecado({
        responsavel,
        tipo_recado,
        recado,
        status
    })

    return novoRecado
}//↪ Criar um recado


export async function getRecadosService() {

    const recados = await listarRecados()

    return recados
}//↪ Ler todos os recados


export async function getRecadoByIdService(id) {

    const recado = await buscarRecadoPorId(id)

    if (!recado) {
        throw new Error('Recado não encontrado')
    }

    return recado
}//↪ Ler um único recado


export async function updateRecadoService(
    id,
    {
        responsavel,
        tipo_recado,
        recado,
        status
    }
) {

    const recadoExistente = await buscarRecadoPorId(id)

    if (!recadoExistente) {
        throw new Error('Recado não encontrado')
    }

    const recadoAtualizado = await atualizarRecado(
        id,
        {
            responsavel,
            tipo_recado,
            recado,
            status
        }
    )

    return recadoAtualizado
}//↪ Atualizar um único recado


export async function deleteRecadoService(id) {

    const recadoExistente = await buscarRecadoPorId(id)

    if (!recadoExistente) {
        throw new Error('Recado não encontrado')
    }

    const recadoDeletado = await deletarRecado(id)

    return recadoDeletado
}//↪ Deletar um único recado