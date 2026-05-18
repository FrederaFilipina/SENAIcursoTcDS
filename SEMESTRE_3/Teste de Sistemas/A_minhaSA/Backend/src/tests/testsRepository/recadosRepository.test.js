import { jest } from '@jest/globals'
import { pool } from '../../config/db.js'
import {criarRecado, listarRecados, buscarRecadoPorId, atualizarRecado, deletarRecado } from '../../repositories/recadosRepository.js'

describe('recadosRepository', () => {

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('criarRecado', () => {

        it('deve criar um recado', async () => {

            pool.query = jest.fn().mockResolvedValue({
                rows: [
                    {
                        id: 1,
                        responsavel: 'Frederico',
                        tipo_recado: 'Aviso',
                        recado: 'Teste de recado',
                        status: 'ativo'
                    }
                ]
            })

            const resultado = await criarRecado({
                responsavel: 'Frederico',
                tipo_recado: 'Aviso',
                recado: 'Teste de recado',
                status: 'ativo'
            })

            expect(pool.query).toHaveBeenCalledTimes(1)

            expect(pool.query).toHaveBeenCalledWith(
                expect.stringContaining('INSERT INTO recados'),
                [
                    'Frederico',
                    'Aviso',
                    'Teste de recado',
                    'ativo'
                ]
            )

            expect(resultado).toEqual({
                id: 1,
                responsavel: 'Frederico',
                tipo_recado: 'Aviso',
                recado: 'Teste de recado',
                status: 'ativo'
            })
        })

    })

    describe('listarRecados', () => {

        it('deve listar todos os recados', async () => {

            pool.query = jest.fn().mockResolvedValue({
                rows: [
                    {
                        id: 1,
                        responsavel: 'Frederico'
                    },
                    {
                        id: 2,
                        responsavel: 'Maria'
                    }
                ]
            })

            const resultado = await listarRecados()

            expect(pool.query).toHaveBeenCalledTimes(1)

            expect(pool.query).toHaveBeenCalledWith(
                expect.stringContaining('SELECT *')
            )

            expect(resultado).toHaveLength(2)
        })

    })

    describe('buscarRecadoPorId', () => {

        it('deve buscar um recado pelo id', async () => {

            pool.query = jest.fn().mockResolvedValue({
                rows: [
                    {
                        id: 1,
                        responsavel: 'Frederico',
                        recado: 'Teste'
                    }
                ]
            })

            const resultado = await buscarRecadoPorId(1)

            expect(pool.query).toHaveBeenCalledTimes(1)

            expect(pool.query).toHaveBeenCalledWith(
                expect.stringContaining('WHERE id = $1'),
                [1]
            )

            expect(resultado.id).toBe(1)
        })

        it('deve retornar undefined quando não encontrar recado', async () => {

            pool.query = jest.fn().mockResolvedValue({
                rows: []
            })

            const resultado = await buscarRecadoPorId(999)

            expect(resultado).toBeUndefined()
        })

    })

    describe('atualizarRecado', () => {

        it('deve atualizar um recado', async () => {

            pool.query = jest.fn().mockResolvedValue({
                rows: [
                    {
                        id: 1,
                        responsavel: 'Frederico',
                        tipo_recado: 'Urgente',
                        recado: 'Recado atualizado',
                        status: 'finalizado'
                    }
                ]
            })

            const resultado = await atualizarRecado(
                1,
                {
                    responsavel: 'Frederico',
                    tipo_recado: 'Urgente',
                    recado: 'Recado atualizado',
                    status: 'finalizado'
                }
            )

            expect(pool.query).toHaveBeenCalledTimes(1)

            expect(pool.query).toHaveBeenCalledWith(
                expect.stringContaining('UPDATE recados'),
                [
                    'Frederico',
                    'Urgente',
                    'Recado atualizado',
                    'finalizado',
                    1
                ]
            )

            expect(resultado.recado).toBe('Recado atualizado')
        })

    })

    describe('deletarRecado', () => {

        it('deve deletar um recado', async () => {

            pool.query = jest.fn().mockResolvedValue({
                rows: [
                    {
                        id: 1,
                        responsavel: 'Frederico'
                    }
                ]
            })

            const resultado = await deletarRecado(1)

            expect(pool.query).toHaveBeenCalledTimes(1)

            expect(pool.query).toHaveBeenCalledWith(
                expect.stringContaining('DELETE FROM recados'),
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
                listarRecados()
            ).rejects.toThrow('Erro no banco')
        })

    })

})