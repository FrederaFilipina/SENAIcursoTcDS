import { Router } from 'express'
import { loginService } from '../services/authServices.js'

const router = Router()

router.post('/login', async (req, res) => {

    try {

        const {
            usuario,
            senha
        } = req.body

        const morador = await loginService({
            usuario,
            senha
        })

        return res.status(200).json({
            message: 'Login realizado com sucesso',
            morador
        })

    } catch (error) {

        return res.status(401).json({
            message: error.message
        })
    }
})

export default router