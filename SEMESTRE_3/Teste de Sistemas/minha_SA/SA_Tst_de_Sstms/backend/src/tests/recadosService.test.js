import request from 'supertest'
import express from 'express'

import router from '../routes/recadosRoutes.js'

import * as recadosService from '../services/recadosService.js'

jest.mock('../services/recadosService.js')

const app = express()

app.use(express.json())
app.use('/recados', router)

describe('Testes RF - Recados', () => {

    test('RF-06 - Deve criar um recado com sucesso', async () => {

        recadosService.criarRecado.mockResolvedValue({
            mensagem: 'Recado cadastrado com sucesso! ID do recado: 1',
            recado: {
                id: 1,
                responsavel: 1,
                tipo_recado: 'Avisos Administrativos',
                recado: 'Reunião no salão',
                status: 'ativo'
            }
        })

        const response = await request(app)
            .post('/recados')
            .send({
                responsavel: 1,
                tipo_recado: 'Avisos Administrativos',
                recado: 'Reunião no salão',
                status: 'ativo'
            })

        expect(response.status).toBe(201)

        expect(response.body.recado.tipo_recado)
            .toBe('Avisos Administrativos')
    })

    test('RF-06 - Deve retornar erro ao criar recado inválido', async () => {

        recadosService.criarRecado.mockRejectedValue(
            new Error('Erro ao cadastrar recado')
        )

        const response = await request(app)
            .post('/recados')
            .send({
                responsavel: null,
                tipo_recado: '',
                recado: ''
            })

        expect(response.status).toBe(500)

        expect(response.body.error)
            .toBe('Erro ao cadastrar recado')
    })

    test('RF-07 - Deve listar todos os recados', async () => {

        recadosService.listarRecados.mockResolvedValue({
            mensagem: 'Aqui está a lista de todos os recados:',
            recados: [
                {
                    id: 1,
                    responsavel: 1,
                    nome_responsavel: 'Carlos',
                    tipo_recado: 'Comunicados Gerais',
                    recado: 'Aviso importante',
                    status: 'ativo'
                }
            ]
        })

        const response = await request(app)
            .get('/recados')

        expect(response.status).toBe(200)

        expect(response.body.recados.length)
            .toBe(1)
    })

    test('RF-08 - Deve buscar recado por ID', async () => {

        recadosService.buscarRecadoPorId.mockResolvedValue({
            mensagem: 'Esses são os dados do recado do ID 1:',
            recado: {
                id: 1,
                responsavel: 1,
                nome_responsavel: 'Carlos',
                tipo_recado: 'Avisos Administrativos',
                recado: 'Teste',
                status: 'ativo'
            }
        })

        const response = await request(app)
            .get('/recados/1')

        expect(response.status).toBe(200)

        expect(response.body.recado.id)
            .toBe(1)
    })

    test('RF-08 - Deve retornar erro ao buscar ID inexistente', async () => {

        recadosService.buscarRecadoPorId.mockResolvedValue(null)

        const response = await request(app)
            .get('/recados/999')

        expect(response.status).toBe(404)

        expect(response.body.error)
            .toBe('Recado não encontrado')
    })

    test('RF-09 - Deve atualizar recado com sucesso', async () => {

        recadosService.atualizarRecado.mockResolvedValue({
            mensagem: 'Recado atualizado com sucesso! ID do recado: 1',
            recado: {
                id: 1,
                responsavel: 1,
                tipo_recado: 'Comunicados Gerais',
                recado: 'Recado atualizado',
                status: 'encerrado'
            }
        })

        const response = await request(app)
            .put('/recados/1')
            .send({
                responsavel: 1,
                tipo_recado: 'Comunicados Gerais',
                recado: 'Recado atualizado',
                status: 'encerrado'
            })

        expect(response.status).toBe(200)

        expect(response.body.recado.status)
            .toBe('encerrado')
    })

    test('RF-09 - Deve retornar erro ao atualizar recado inexistente', async () => {

        recadosService.atualizarRecado.mockResolvedValue(null)

        const response = await request(app)
            .put('/recados/999')
            .send({
                responsavel: 1,
                tipo_recado: 'Comunicados Gerais',
                recado: 'Teste',
                status: 'ativo'
            })

        expect(response.status).toBe(404)

        expect(response.body.error)
            .toBe('Recado não encontrado')
    })

    test('RF-10 - Deve deletar recado com sucesso', async () => {

        recadosService.deletarRecado.mockResolvedValue({
            mensagem: 'Recado do ID 1 foi deletado com sucesso!'
        })

        const response = await request(app)
            .delete('/recados/1')

        expect(response.status).toBe(200)

        expect(response.body.message)
            .toBe('Recado deletado com sucesso')
    })

    test('RF-10 - Deve retornar erro ao deletar recado inexistente', async () => {

        recadosService.deletarRecado.mockResolvedValue(null)

        const response = await request(app)
            .delete('/recados/999')

        expect(response.status).toBe(404)

        expect(response.body.error)
            .toBe('Recado não encontrado')
    })

})