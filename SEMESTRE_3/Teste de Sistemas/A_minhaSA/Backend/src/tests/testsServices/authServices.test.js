import { jest } from '@jest/globals'





const mockBuscarUsuario = jest.fn()

jest.unstable_mockModule(
    '../../repositories/authRepository.js',
    () => ({
        buscarUsuario: mockBuscarUsuario
    })
)





const { loginService } = await import(
    '../../services/authServices.js'
)





describe('Auth Service', () => {

    afterEach(() => {
        jest.clearAllMocks()
    })



    test('deve realizar login com sucesso', async () => {

        mockBuscarUsuario.mockResolvedValue({
            id: 1,
            nome: 'João',
            usuario: 'joao123',
            senha: '123456'
        })

        const resultado = await loginService({
            usuario: 'joao123',
            senha: '123456'
        })

        expect(resultado).toHaveProperty('id')

        expect(resultado.usuario)
            .toBe('joao123')
    })



    test('deve lançar erro se usuário não existir', async () => {

        mockBuscarUsuario.mockResolvedValue(null)

        await expect(
            loginService({
                usuario: 'teste',
                senha: '123'
            })
        ).rejects.toThrow(
            'Usuário não encontrado'
        )
    })



    test('deve lançar erro para senha inválida', async () => {

        mockBuscarUsuario.mockResolvedValue({
            usuario: 'joao',
            senha: '123456'
        })

        await expect(
            loginService({
                usuario: 'joao',
                senha: '999999'
            })
        ).rejects.toThrow(
            'Senha inválida'
        )
    })
})