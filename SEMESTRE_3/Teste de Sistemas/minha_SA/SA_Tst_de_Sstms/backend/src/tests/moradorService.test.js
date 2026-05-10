import request from 'supertest'
import express from 'express'
import router from '../routes/moradorRoutes.js'

import * as moradorService from '../services/moradorService.js'

jest.mock('../services/moradorService.js')

const app = express()
app.use(express.json())
app.use('/moradores', router)

describe('Testes RF - Moradores', () => {

    test('RF-01 - Deve cadastrar um morador com sucesso', async () => {

        moradorService.criarMorador.mockResolvedValue({
            mensagem: 'Morador cadastrado com sucesso! ID do cadastro: 1',
            morador: {
                id: 1,
                nome: 'Carlos',
                bloco: 'A',
                num_ap: '101'
            }
        })

        const response = await request(app)
            .post('/moradores')
            .send({
                nome: 'Carlos',
                bloco: 'A',
                num_ap: '101'
            })

        expect(response.status).toBe(201)
        expect(response.body.morador.nome).toBe('Carlos')
    })

    test('RF-01 - Não deve cadastrar bloco inválido', async () => {

        moradorService.criarMorador.mockRejectedValue(
            new Error("O bloco deve ser apenas 'A' ou 'B'")
        )

        const response = await request(app)
            .post('/moradores')
            .send({
                nome: 'Carlos',
                bloco: 'C',
                num_ap: '101'
            })

        expect(response.status).toBe(500)
        expect(response.body.error)
            .toBe("O bloco deve ser apenas 'A' ou 'B'")
    })


    test('RF-02 - Deve listar todos os moradores', async () => {

        moradorService.listarMoradores.mockResolvedValue({
            mensagem: 'Aqui está a lista de todos os moradores:',
            moradores: [
                {
                    id: 1,
                    nome: 'Carlos',
                    bloco: 'A',
                    num_ap: '101'
                }
            ]
        })

        const response = await request(app)
            .get('/moradores')

        expect(response.status).toBe(200)
        expect(response.body.moradores.length).toBe(1)
    })

    test('RF-03 - Deve buscar morador por ID', async () => {

        moradorService.buscarMoradorPorId.mockResolvedValue({
            mensagem: 'Esses são os dados do morador do ID 1:',
            morador: {
                id: 1,
                nome: 'Carlos',
                bloco: 'A',
                num_ap: '101'
            }
        })

        const response = await request(app)
            .get('/moradores/1')

        expect(response.status).toBe(200)
        expect(response.body.morador.id).toBe(1)
    })

    test('RF-03 - Deve retornar erro ao buscar ID inexistente', async () => {

        moradorService.buscarMoradorPorId.mockResolvedValue(null)

        const response = await request(app)
            .get('/moradores/999')

        expect(response.status).toBe(404)
        expect(response.body.error)
            .toBe('Morador não encontrado')
    })

    test('RF-04 - Deve atualizar morador com sucesso', async () => {

        moradorService.atualizarMorador.mockResolvedValue({
            mensagem: 'Morador atualizado com sucesso! ID do cadastro: 1',
            morador: {
                id: 1,
                nome: 'Carlos Silva',
                bloco: 'B',
                num_ap: '201'
            }
        })

        const response = await request(app)
            .put('/moradores/1')
            .send({
                nome: 'Carlos Silva',
                bloco: 'B',
                num_ap: '201'
            })

        expect(response.status).toBe(200)
        expect(response.body.morador.nome)
            .toBe('Carlos Silva')
    })

    test('RF-05 - Deve deletar morador com sucesso', async () => {

        moradorService.deletarMorador.mockResolvedValue({
            mensagem: 'Morador do ID 1 foi deletado com sucesso!'
        })

        const response = await request(app)
            .delete('/moradores/1')

        expect(response.status).toBe(200)
        expect(response.body.message)
            .toBe('Morador deletado com sucesso')
    })

    test('RF-05 - Deve retornar erro ao deletar ID inexistente', async () => {

        moradorService.deletarMorador.mockResolvedValue(null)

        const response = await request(app)
            .delete('/moradores/999')

        expect(response.status).toBe(404)
        expect(response.body.error)
            .toBe('Morador não encontrado')
    })

})