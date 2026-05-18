import { jest } from '@jest/globals'
import { pool } from '../../config/db.js'
import { buscarUsuario } from '../../repositories/authRepository.js'

describe('authRepository - buscarUsuario', () => {

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('deve buscar um usuário pelo nome de usuário', async () => {

        pool.query = jest.fn().mockResolvedValue({
            rows: [
                {
                    id: 1,
                    usuario: 'frederico',
                    senha: '123456'
                }
            ]
        })

        const resultado = await buscarUsuario('frederico')

        expect(pool.query).toHaveBeenCalledTimes(1)

        expect(pool.query).toHaveBeenCalledWith(
            expect.stringContaining('SELECT *'),
            ['frederico']
        )

        expect(resultado).toEqual({
            id: 1,
            usuario: 'frederico',
            senha: '123456'
        })
    })

    it('deve retornar undefined quando usuário não existir', async () => {

        pool.query = jest.fn().mockResolvedValue({
            rows: []
        })

        const resultado = await buscarUsuario('usuario_inexistente')

        expect(pool.query).toHaveBeenCalledTimes(1)

        expect(resultado).toBeUndefined()
    })

    it('deve lançar erro quando ocorrer erro no banco', async () => {

        pool.query = jest.fn().mockRejectedValue(
            new Error('Erro no banco')
        )

        await expect(
            buscarUsuario('frederico')
        ).rejects.toThrow('Erro no banco')

        expect(pool.query).toHaveBeenCalledTimes(1)
    })
})