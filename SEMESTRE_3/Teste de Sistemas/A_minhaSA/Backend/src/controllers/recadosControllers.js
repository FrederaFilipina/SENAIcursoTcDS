import { createRecadoService, getRecadosService, getRecadoByIdService, updateRecadoService, deleteRecadoService } from '../services/recadosServices.js'


export async function createRecado(req, res) {

    try {

        const {
            responsavel,
            tipo_recado,
            recado,
            status
        } = req.body

        const novoRecado = await createRecadoService({
            responsavel,
            tipo_recado,
            recado,
            status
        })

        return res.status(201).json({
            message: 'Recado criado com sucesso',
            recado: novoRecado
        })

    } catch (error) {

        return res.status(400).json({
            message: error.message
        })
    }
}//↪ Criar um recado


export async function getRecados(req, res) {

    try {

        const recados = await getRecadosService()

        return res.status(200).json(recados)

    } catch (error) {

        return res.status(500).json({
            message: 'Erro ao listar recados'
        })
    }
}//↪ Ler todos os recados


export async function getRecadoById(req, res) {

    try {

        const { id } = req.params

        const recado = await getRecadoByIdService(id)

        return res.status(200).json(recado)

    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}//↪ Ler um único recado


export async function updateRecado(req, res) {

    try {

        const { id } = req.params

        const {
            responsavel,
            tipo_recado,
            recado,
            status
        } = req.body

        const recadoAtualizado = await updateRecadoService(
            id,
            {
                responsavel,
                tipo_recado,
                recado,
                status
            }
        )

        return res.status(200).json({
            message: 'Recado atualizado com sucesso',
            recado: recadoAtualizado
        })

    } catch (error) {

        return res.status(400).json({
            message: error.message
        })
    }
}//↪ Atualizar um único recado


export async function removeRecado(req, res) {

    try {

        const { id } = req.params

        const recadoDeletado = await deleteRecadoService(id)

        return res.status(200).json({
            message: 'Recado removido com sucesso',
            recado: recadoDeletado
        })

    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}//↪ Deletar um único recado