import { jest } from '@jest/globals'
jest.unstable_mockModule('../../config/db.js', () => ({
  pool: {
    query: jest.fn()
  }
}))


const { buscarUsuario } = await import('../../repositories/authRepository.js')
const { pool } = await import('../../config/db.js')

describe('authRepository.buscarUsuario', () => {
  it('Deve retornar o usuário quando encontrado no banco', async () => {
    const mockUsuario = { id: 1, usuario: 'joao', senha: '123456' }
    pool.query.mockResolvedValueOnce({ rows: [mockUsuario] })

    const resultado = await buscarUsuario('joao')

    expect(pool.query).toHaveBeenCalledWith(
      expect.stringContaining('SELECT id, usuario, senha'),
      ['joao']
    )
    expect(resultado).toEqual(mockUsuario)
  })

  it('Deve retornar null quando o usuário não for encontrado', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] })

    const resultado = await buscarUsuario('usuarioInexistente')

    expect(pool.query).toHaveBeenCalledWith(
      expect.stringContaining('SELECT id, usuario, senha'),
      ['usuarioInexistente']
    )
    expect(resultado).toBeNull()
  })
})
