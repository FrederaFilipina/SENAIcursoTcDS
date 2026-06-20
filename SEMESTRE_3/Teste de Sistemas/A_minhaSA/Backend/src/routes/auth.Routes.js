import { Router } from 'express'
import { login } from '../controllers/authController.js'

const router = Router()

// Delegar ao controller
router.post('/login', login)

export default router
