import { jest } from '@jest/globals'


jest.unstable_mockModule('../../services/moradoresServices.js', () => ({
        createMoradorService: jest.fn(),
        getMoradoresService: jest.fn(),
        getMoradorByIdService: jest.fn(),
        updateMoradorService: jest.fn(),
        deleteMoradorService: jest.fn()
    })
)


const moradoresServices = await import('../../services/moradoresServices.js')

const {
    createMorador,
    getMoradores,
    getMoradorById,
    updateMorador,
    removeMorador
} = await import('../../controllers/moradoresControllers.js')


describe('Moradores Controllers', () => {

    let req
    let res

    beforeEach(() => {

        req = {}

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        jest.clearAllMocks()
    })


    describe('createMorador', () => {

        it('deve criar um morador', async () => {

            req.body = {
                nome: 'Frederico',
                bloco: 'A',
                num_ap: 101,
                usuario: 'fred',
                senha: '123456'
            }

            moradoresServices.createMoradorService
                .mockResolvedValue({
                    id: 1,
                    ...req.body
                })

            await createMorador(req, res)

            expect(res.status).toHaveBeenCalledWith(201)

            expect(res.json).toHaveBeenCalled()
        })
    })


    describe('getMoradores', () => {

        it('deve listar moradores', async () => {

            moradoresServices.getMoradoresService
                .mockResolvedValue([
                    {
                        id: 1,
                        nome: 'Frederico'
                    }
                ])

            await getMoradores(req, res)

            expect(res.status).toHaveBeenCalledWith(200)

            expect(res.json).toHaveBeenCalled()
        })
    })


    describe('getMoradorById', () => {

        it('deve retornar um morador', async () => {

            req.params = {
                id: 1
            }

            moradoresServices.getMoradorByIdService
                .mockResolvedValue({
                    id: 1,
                    nome: 'Frederico'
                })

            await getMoradorById(req, res)

            expect(res.status).toHaveBeenCalledWith(200)

            expect(res.json).toHaveBeenCalled()
        })
    })


    describe('updateMorador', () => {

        it('deve atualizar um morador', async () => {

            req.params = {
                id: 1
            }

            req.body = {
                nome: 'Carlos',
                bloco: 'B',
                num_ap: 202,
                usuario: 'carlos',
                senha: '123456'
            }

            moradoresServices.updateMoradorService
                .mockResolvedValue({
                    id: 1,
                    ...req.body
                })

            await updateMorador(req, res)

            expect(res.status).toHaveBeenCalledWith(200)

            expect(res.json).toHaveBeenCalled()
        })
    })


    describe('removeMorador', () => {

        it('deve remover um morador', async () => {

            req.params = {
                id: 1
            }

            moradoresServices.deleteMoradorService
                .mockResolvedValue({
                    id: 1,
                    nome: 'Frederico'
                })

            await removeMorador(req, res)

            expect(res.status).toHaveBeenCalledWith(200)

            expect(res.json).toHaveBeenCalled()
        })
    })
})