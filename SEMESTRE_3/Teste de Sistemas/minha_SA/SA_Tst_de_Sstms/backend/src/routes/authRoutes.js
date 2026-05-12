import { Router } from 'express'
import { login } from '../services/authService.js'

const router = Router()


router.post('/login', async (req, res) => {

    try {

        const { usuario, senha } = req.body
        const resultado = await login({
            usuario,
            senha
        })

        return res.json(resultado)

    } catch (err) {

        if (
            err.message.includes('Usuário') ||
            err.message.includes('Senha') ||
            err.message.includes('obrigatórios')
        ) {
            return res.status(401).json({
                error: err.message
            })
        }

        return res.status(500).json({
            error: err.message
        })
    }

})


export default router