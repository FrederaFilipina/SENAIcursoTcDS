import { Router } from 'express'
import { createRecado, getRecados, getRecadoById, updateRecado, removeRecado } from '../controllers/recadosController.js'

const router = Router()


router.post('/recados', createRecado)
//↪ Criar um recado

router.get('/recados', getRecados)
//↪ Ler todos os recados

router.get('/recados/:id', getRecadoById)
//↪ Ler um único recado

router.put('/recados/:id', updateRecado)
//↪ Atualizar um único recado

router.delete('/recados/:id', removeRecado)
//↪ Deletar um único recado

export default router