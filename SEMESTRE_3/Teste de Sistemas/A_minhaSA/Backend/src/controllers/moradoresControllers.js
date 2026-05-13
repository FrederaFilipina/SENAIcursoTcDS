import { createMoradorService, getMoradoresService, getMoradorByIdService, updateMoradorService, deleteMoradorService } from '../services/moradoresServices.js'


export async function createMorador(req, res) {

    try {

        const {
            nome,
            bloco,
            num_ap,
            usuario,
            senha
        } = req.body

        const novoMorador = await createMoradorService({
            nome,
            bloco,
            num_ap,
            usuario,
            senha
        })

        return res.status(201).json({
            message: 'Morador criado com sucesso',
            morador: novoMorador
        })

    } catch (error) {

        return res.status(400).json({
            message: error.message
        })
    }
}//↪ Criar usuário de morador


export async function getMoradores(req, res) {

    try {

        const moradores = await getMoradoresService()

        return res.status(200).json(moradores)

    } catch (error) {

        return res.status(500).json({
            message: 'Erro ao listar moradores'
        })
    }
}//↪ Ler todo os usuários criados


export async function getMoradorById(req, res) {

    try {

        const { id } = req.params

        const morador = await getMoradorByIdService(id)

        return res.status(200).json(morador)

    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}//↪ Ler um único usuário


export async function updateMorador(req, res) {

    try {

        const { id } = req.params

        const {
            nome,
            bloco,
            num_ap,
            usuario,
            senha
        } = req.body

        const moradorAtualizado = await updateMoradorService(
            id,
            {
                nome,
                bloco,
                num_ap,
                usuario,
                senha
            }
        )

        return res.status(200).json({
            message: 'Morador atualizado com sucesso',
            morador: moradorAtualizado
        })

    } catch (error) {

        return res.status(400).json({
            message: error.message
        })
    }
}//↪ Atualizar os dados de um único usuário


export async function removeMorador(req, res) {

    try {

        const { id } = req.params

        const moradorDeletado = await deleteMoradorService(id)

        return res.status(200).json({
            message: 'Morador removido com sucesso',
            morador: moradorDeletado
        })

    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}//↪ Deletar o úsuario de um único modador