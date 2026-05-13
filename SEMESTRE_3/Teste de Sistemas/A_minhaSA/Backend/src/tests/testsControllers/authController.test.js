import { jest } from '@jest/globals'





const mockLoginService = jest.fn()

jest.unstable_mockModule(
    '../../services/authServices.js',
    () => ({
        loginService: mockLoginService
    })
)





const { login } = await import(
    '../../controllers/authController.js'
)





describe('Auth Controller', () => {

    let req
    let res



    beforeEach(() => {

        req = {
            body: {}
        }

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
    })



    afterEach(() => {
        jest.clearAllMocks()
    })



    test('deve retornar login com sucesso', async () => {

        req.body = {
            usuario: 'joao',
            senha: '123456'
        }

        mockLoginService.mockResolvedValue({
            id: 1,
            nome: 'João'
        })

        await login(req, res)

        expect(res.status)
            .toHaveBeenCalledWith(200)

        expect(res.json)
            .toHaveBeenCalledWith({
                message: 'Login realizado com sucesso',
                morador: {
                    id: 1,
                    nome: 'João'
                }
            })
    })



    test('deve retornar erro 401', async () => {

        req.body = {
            usuario: 'joao',
            senha: '123'
        }

        mockLoginService.mockRejectedValue(
            new Error('Senha inválida')
        )

        await login(req, res)

        expect(res.status)
            .toHaveBeenCalledWith(401)

        expect(res.json)
            .toHaveBeenCalledWith({
                message: 'Senha inválida'
            })
    })
})