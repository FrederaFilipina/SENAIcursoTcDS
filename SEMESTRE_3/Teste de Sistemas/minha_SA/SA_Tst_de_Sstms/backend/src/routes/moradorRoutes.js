import { Router } from 'express'
import { criarMorador, listarMoradores, buscarMoradorPorId, atualizarMorador, deletarMorador } from '../services/moradorService.js'

const router = Router()


router.post('/', async (req, res) => {
    try {
        const { nome, bloco, num_ap } = req.body

        const novoMorador = await criarMorador({ nome, bloco, num_ap })

        return res.status(201).json(novoMorador)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})// ↪ Criar morador

router.get('/', async (_, res) => {
    try {
        const moradores = await listarMoradores()
        return res.json(moradores)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})// ↪ Listar TODOS os moradores

router.get('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)

        const morador = await buscarMoradorPorId(id)

        if (!morador) {
            return res.status(404).json({ error: 'Morador não encontrado' })
        }

        return res.json(morador)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})// ↪ Buscar morador específico

router.put('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)
        const { nome, bloco, num_ap } = req.body

        const moradorAtualizado = await atualizarMorador(id, {
            nome,
            bloco,
            num_ap
        })

        if (!moradorAtualizado) {
            return res.status(404).json({ error: 'Morador não encontrado' })
        }

        return res.json(moradorAtualizado)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})// ↪ Atualizar dados morador


router.delete('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)

        const deletado = await deletarMorador(id)

        if (!deletado) {
            return res.status(404).json({ error: 'Morador não encontrado' })
        }

        return res.json({ message: 'Morador deletado com sucesso' })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})// ↪ Deletar morador

export default router