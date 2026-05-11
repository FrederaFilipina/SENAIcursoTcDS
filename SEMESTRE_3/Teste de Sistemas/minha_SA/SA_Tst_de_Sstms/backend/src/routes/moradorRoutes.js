import { Router } from 'express'

import {
    criarMorador,
    listarMoradores,
    buscarMoradorPorId,
    atualizarMorador,
    deletarMorador
} from '../services/moradorService.js'

const router = Router()


router.post('/', async (req, res) => {

    try {

        const {
            nome,
            bloco,
            num_ap,
            usuario,
            senha
        } = req.body

        const novoMorador = await criarMorador({
            nome,
            bloco,
            num_ap,
            usuario,
            senha
        })

        return res.status(201).json(novoMorador)

    } catch (err) {

        if (
            err.message.includes('bloco') ||
            err.message.includes('apartamento') ||
            err.message.includes('obrigatórios') ||
            err.message.includes('usuário')
        ) {
            return res.status(400).json({
                error: err.message
            })
        }

        return res.status(500).json({
            error: err.message
        })
    }

})// ↪ Criar morador



router.get('/', async (_, res) => {

    try {

        const moradores = await listarMoradores()

        return res.json(moradores)

    } catch (err) {

        return res.status(500).json({
            error: err.message
        })
    }

})// ↪ Listar TODOS os moradores



router.get('/:id', async (req, res) => {

    try {

        const id = Number(req.params.id)

        if (isNaN(id)) {
            return res.status(400).json({
                error: 'ID inválido'
            })
        }

        const morador = await buscarMoradorPorId(id)

        if (!morador) {
            return res.status(404).json({
                error: 'Morador não encontrado'
            })
        }

        return res.json(morador)

    } catch (err) {

        return res.status(500).json({
            error: err.message
        })
    }

})// ↪ Buscar morador específico



router.put('/:id', async (req, res) => {

    try {

        const id = Number(req.params.id)

        if (isNaN(id)) {
            return res.status(400).json({
                error: 'ID inválido'
            })
        }

        const { nome, bloco, num_ap } = req.body

        const moradorAtualizado = await atualizarMorador(id, {
            nome,
            bloco,
            num_ap
        })

        if (!moradorAtualizado) {
            return res.status(404).json({
                error: 'Morador não encontrado'
            })
        }

        return res.json(moradorAtualizado)

    } catch (err) {

        if (
            err.message.includes('bloco') ||
            err.message.includes('apartamento') ||
            err.message.includes('obrigatórios')
        ) {
            return res.status(400).json({
                error: err.message
            })
        }

        return res.status(500).json({
            error: err.message
        })
    }

})// ↪ Atualizar dados morador



router.delete('/:id', async (req, res) => {

    try {

        const id = Number(req.params.id)

        if (isNaN(id)) {
            return res.status(400).json({
                error: 'ID inválido'
            })
        }

        const deletado = await deletarMorador(id)

        if (!deletado) {
            return res.status(404).json({
                error: 'Morador não encontrado'
            })
        }

        return res.json(deletado)

    } catch (err) {

        return res.status(500).json({
            error: err.message
        })
    }

})// ↪ Deletar morador


export default router