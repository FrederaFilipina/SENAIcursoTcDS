import { jest } from '@jest/globals'


jest.unstable_mockModule('../../services/recadosServices.js', () => ({
    createRecadoService: jest.fn(),
    getRecadosService: jest.fn(),
    getRecadoByIdService: jest.fn(),
    updateRecadoService: jest.fn(),
    deleteRecadoService: jest.fn()
}))


const recadosServices = await import('../../services/recadosServices.js')

const {createRecado,getRecados,getRecadoById,updateRecado,removeRecado} = await import('../../controllers/recadosControllers.js')


const {createRecadoService,getRecadosService,getRecadoByIdService,updateRecadoService,deleteRecadoService} = recadosServices


describe('Testes dos Controllers de Recados', () => {

    let req
    let res

    beforeEach(() => {

        req = {
            body: {},
            params: {}
        }

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('createRecado', () => {

        it('deve criar um recado com sucesso', async () => {

            req.body = {
                responsavel: 'Frederico',
                tipo_recado: 'Aviso',
                recado: 'Teste',
                status: 'ativo'
            }

            const mockRecado = {
                id: 1,
                ...req.body
            }

            createRecadoService.mockResolvedValue(mockRecado)

            await createRecado(req, res)

            expect(createRecadoService).toHaveBeenCalledWith(req.body)

            expect(res.status).toHaveBeenCalledWith(201)

            expect(res.json).toHaveBeenCalledWith({
                message: 'Recado criado com sucesso',
                recado: mockRecado
            })
        })


        it('deve retornar erro ao criar recado', async () => {

            req.body = {
                responsavel: '',
                tipo_recado: '',
                recado: ''
            }

            createRecadoService.mockRejectedValue(
                new Error('Todos os campos obrigatórios devem ser preenchidos')
            )

            await createRecado(req, res)

            expect(res.status).toHaveBeenCalledWith(400)

            expect(res.json).toHaveBeenCalledWith({
                message: 'Todos os campos obrigatórios devem ser preenchidos'
            })
        })
    })

    describe('getRecados', () => {

        it('deve listar todos os recados', async () => {

            const mockRecados = [
                {
                    id: 1,
                    responsavel: 'Frederico',
                    tipo_recado: 'Aviso',
                    recado: 'Teste 1',
                    status: 'ativo'
                },
                {
                    id: 2,
                    responsavel: 'Maria',
                    tipo_recado: 'Urgente',
                    recado: 'Teste 2',
                    status: 'pendente'
                }
            ]

            getRecadosService.mockResolvedValue(mockRecados)

            await getRecados(req, res)

            expect(getRecadosService).toHaveBeenCalled()

            expect(res.status).toHaveBeenCalledWith(200)

            expect(res.json).toHaveBeenCalledWith(mockRecados)
        })


        it('deve retornar erro ao listar recados', async () => {

            getRecadosService.mockRejectedValue(
                new Error('Erro interno')
            )

            await getRecados(req, res)

            expect(res.status).toHaveBeenCalledWith(500)

            expect(res.json).toHaveBeenCalledWith({
                message: 'Erro ao listar recados'
            })
        })
    })

    describe('getRecadoById', () => {

        it('deve retornar um recado pelo ID', async () => {

            req.params.id = 1

            const mockRecado = {
                id: 1,
                responsavel: 'Frederico',
                tipo_recado: 'Aviso',
                recado: 'Teste',
                status: 'ativo'
            }

            getRecadoByIdService.mockResolvedValue(mockRecado)

            await getRecadoById(req, res)

            expect(getRecadoByIdService).toHaveBeenCalledWith(1)

            expect(res.status).toHaveBeenCalledWith(200)

            expect(res.json).toHaveBeenCalledWith(mockRecado)
        })


        it('deve retornar erro se recado não existir', async () => {

            req.params.id = 1

            getRecadoByIdService.mockRejectedValue(
                new Error('Recado não encontrado')
            )

            await getRecadoById(req, res)

            expect(res.status).toHaveBeenCalledWith(404)

            expect(res.json).toHaveBeenCalledWith({
                message: 'Recado não encontrado'
            })
        })
    })

    describe('updateRecado', () => {

        it('deve atualizar um recado com sucesso', async () => {

            req.params.id = 1

            req.body = {
                responsavel: 'Frederico',
                tipo_recado: 'Urgente',
                recado: 'Mensagem atualizada',
                status: 'pendente'
            }

            const mockRecadoAtualizado = {
                id: 1,
                ...req.body
            }

            updateRecadoService.mockResolvedValue(
                mockRecadoAtualizado
            )

            await updateRecado(req, res)

            expect(updateRecadoService).toHaveBeenCalledWith(
                1,
                req.body
            )

            expect(res.status).toHaveBeenCalledWith(200)

            expect(res.json).toHaveBeenCalledWith({
                message: 'Recado atualizado com sucesso',
                recado: mockRecadoAtualizado
            })
        })


        it('deve retornar erro ao atualizar recado', async () => {

            req.params.id = 1

            updateRecadoService.mockRejectedValue(
                new Error('Recado não encontrado')
            )

            await updateRecado(req, res)

            expect(res.status).toHaveBeenCalledWith(400)

            expect(res.json).toHaveBeenCalledWith({
                message: 'Recado não encontrado'
            })
        })
    })

    describe('removeRecado', () => {

        it('deve deletar um recado com sucesso', async () => {

            req.params.id = 1

            const mockRecado = {
                id: 1,
                responsavel: 'Frederico',
                tipo_recado: 'Aviso',
                recado: 'Mensagem',
                status: 'ativo'
            }

            deleteRecadoService.mockResolvedValue(mockRecado)

            await removeRecado(req, res)

            expect(deleteRecadoService).toHaveBeenCalledWith(1)

            expect(res.status).toHaveBeenCalledWith(200)

            expect(res.json).toHaveBeenCalledWith({
                message: 'Recado removido com sucesso',
                recado: mockRecado
            })
        })


        it('deve retornar erro ao deletar recado inexistente', async () => {

            req.params.id = 1

            deleteRecadoService.mockRejectedValue(
                new Error('Recado não encontrado')
            )

            await removeRecado(req, res)

            expect(res.status).toHaveBeenCalledWith(404)

            expect(res.json).toHaveBeenCalledWith({
                message: 'Recado não encontrado'
            })
        })
    })
})