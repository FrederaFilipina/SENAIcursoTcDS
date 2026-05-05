import { Router } from 'express'
import { criarRecado, listarRecados, buscarRecadoPorId, atualizarRecado, deletarRecado } from '../services/recadosService.js'

const router = Router()


router.post('/', async (req, res) => {
    try {
        const { responsavel, tipo_recado, recado, status } = req.body

        const novoRecado = await criarRecado({
            responsavel,
            tipo_recado,
            recado,
            status
        })

        return res.status(201).json(novoRecado)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})// ↪ Criar recado

router.get('/', async (_, res) => {
    try {
        const recados = await listarRecados()
        return res.json(recados)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})// ↪ Buscar TODOS recados

router.get('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)

        const recado = await buscarRecadoPorId(id)

        if (!recado) {
            return res.status(404).json({ error: 'Recado não encontrado' })
        }

        return res.json(recado)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})// ↪ Buscar recado específico

router.put('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)
        const { responsavel, tipo_recado, recado, status } = req.body

        const recadoAtualizado = await atualizarRecado(id, {
            responsavel,
            tipo_recado,
            recado,
            status
        })

        if (!recadoAtualizado) {
            return res.status(404).json({ error: 'Recado não encontrado' })
        }

        return res.json(recadoAtualizado)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})// ↪ Atualizar recado

router.delete('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)

        const deletado = await deletarRecado(id)

        if (!deletado) {
            return res.status(404).json({ error: 'Recado não encontrado' })
        }

        return res.json({ message: 'Recado deletado com sucesso' })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})// ↪ Deletar recado

export default router