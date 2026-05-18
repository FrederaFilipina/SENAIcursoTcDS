import { jest } from '@jest/globals'
import { pool } from '../../config/db.js'
import {criarMorador, listarMoradores, buscarMoradorPorId, atualizarMorador, deletarMorador} from '../../repositories/moradoresRepository.js'

describe('moradoresRepository', () => {

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('criarMorador', () => {

        it('deve criar um morador', async () => {

            pool.query = jest.fn().mockResolvedValue({
                rows: [
                    {
                        id: 1,
                        nome: 'Frederico',
                        bloco: 'A',
                        num_ap: 101,
                        usuario: 'fred',
                        senha: '123456'
                    }
                ]
            })

            const resultado = await criarMorador({
                nome: 'Frederico',
                bloco: 'A',
                num_ap: 101,
                usuario: 'fred',
                senha: '123456'
            })

            expect(pool.query).toHaveBeenCalledTimes(1)

            expect(pool.query).toHaveBeenCalledWith(
                expect.stringContaining('INSERT INTO moradores'),
                [
                    'Frederico',
                    'A',
                    101,
                    'fred',
                    '123456'
                ]
            )

            expect(resultado.nome).toBe('Frederico')
        })

    })

    describe('listarMoradores', () => {

        it('deve listar todos os moradores', async () => {

            pool.query = jest.fn().mockResolvedValue({
                rows: [
                    {
                        id: 1,
                        nome: 'Frederico'
                    },
                    {
                        id: 2,
                        nome: 'Maria'
                    }
                ]
            })

            const resultado = await listarMoradores()

            expect(pool.query).toHaveBeenCalledTimes(1)

            expect(pool.query).toHaveBeenCalledWith(
                expect.stringContaining('SELECT')
            )

            expect(resultado).toHaveLength(2)
        })

    })

    describe('buscarMoradorPorId', () => {

        it('deve buscar um morador pelo id', async () => {

            pool.query = jest.fn().mockResolvedValue({
                rows: [
                    {
                        id: 1,
                        nome: 'Frederico'
                    }
                ]
            })

            const resultado = await buscarMoradorPorId(1)

            expect(pool.query).toHaveBeenCalledTimes(1)

            expect(pool.query).toHaveBeenCalledWith(
                expect.stringContaining('WHERE id = $1'),
                [1]
            )

            expect(resultado.id).toBe(1)
        })

        it('deve retornar undefined quando não encontrar morador', async () => {

            pool.query = jest.fn().mockResolvedValue({
                rows: []
            })

            const resultado = await buscarMoradorPorId(999)

            expect(resultado).toBeUndefined()
        })

    })

    describe('atualizarMorador', () => {

        it('deve atualizar um morador', async () => {

            pool.query = jest.fn().mockResolvedValue({
                rows: [
                    {
                        id: 1,
                        nome: 'Frederico Atualizado',
                        bloco: 'B',
                        num_ap: 202,
                        usuario: 'fred',
                        senha: '654321'
                    }
                ]
            })

            const resultado = await atualizarMorador(
                1,
                {
                    nome: 'Frederico Atualizado',
                    bloco: 'B',
                    num_ap: 202,
                    usuario: 'fred',
                    senha: '654321'
                }
            )

            expect(pool.query).toHaveBeenCalledTimes(1)

            expect(pool.query).toHaveBeenCalledWith(
                expect.stringContaining('UPDATE moradores'),
                [
                    'Frederico Atualizado',
                    'B',
                    202,
                    'fred',
                    '654321',
                    1
                ]
            )

            expect(resultado.nome).toBe('Frederico Atualizado')
        })

    })

    describe('deletarMorador', () => {

        it('deve deletar um morador', async () => {

            pool.query = jest.fn().mockResolvedValue({
                rows: [
                    {
                        id: 1,
                        nome: 'Frederico'
                    }
                ]
            })

            const resultado = await deletarMorador(1)

            expect(pool.query).toHaveBeenCalledTimes(1)

            expect(pool.query).toHaveBeenCalledWith(
                expect.stringContaining('DELETE FROM moradores'),
                [1]
            )

            expect(resultado.id).toBe(1)
        })

    })

    describe('erros do banco', () => {

        it('deve lançar erro quando o banco falhar', async () => {

            pool.query = jest.fn().mockRejectedValue(
                new Error('Erro no banco')
            )

            await expect(
                listarMoradores()
            ).rejects.toThrow('Erro no banco')
        })

    })

})