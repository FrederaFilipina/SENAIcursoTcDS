import { jest } from '@jest/globals'


jest.unstable_mockModule('../../repositories/moradoresRepository.js',() => ({
        criarMorador: jest.fn(),
        listarMoradores: jest.fn(),
        buscarMoradorPorId: jest.fn(),
        atualizarMorador: jest.fn(),
        deletarMorador: jest.fn()
    })
)


const moradoresRepository = await import('../../repositories/moradoresRepository.js')

const {
    createMoradorService,
    getMoradoresService,
    getMoradorByIdService,
    updateMoradorService,
    deleteMoradorService
} = await import('../../services/moradoresServices.js')


describe('Moradores Services', () => {

    afterEach(() => {
        jest.clearAllMocks()
    })


    describe('createMoradorService', () => {

        it('deve criar um novo morador', async () => {

            const mockMorador = {
                id: 1,
                nome: 'Frederico',
                bloco: 'A',
                num_ap: 101,
                usuario: 'fred'
            }

            moradoresRepository.criarMorador.mockResolvedValue(mockMorador)

            const result = await createMoradorService({
                nome: 'Frederico',
                bloco: 'A',
                num_ap: 101,
                usuario: 'fred',
                senha: '123456'
            })

            expect(moradoresRepository.criarMorador).toHaveBeenCalled()

            expect(result).toEqual(mockMorador)
        })


        it('deve lançar erro se faltar campos', async () => {

            await expect(
                createMoradorService({
                    nome: '',
                    bloco: 'A',
                    num_ap: 101,
                    usuario: 'fred',
                    senha: '123456'
                })
            ).rejects.toThrow('Todos os campos são obrigatórios')
        })
    })


    describe('getMoradoresService', () => {

        it('deve listar moradores', async () => {

            const mockMoradores = [
                {
                    id: 1,
                    nome: 'Frederico'
                }
            ]

            moradoresRepository.listarMoradores.mockResolvedValue(mockMoradores)

            const result = await getMoradoresService()

            expect(moradoresRepository.listarMoradores).toHaveBeenCalled()

            expect(result).toEqual(mockMoradores)
        })
    })


    describe('getMoradorByIdService', () => {

        it('deve retornar um morador pelo id', async () => {

            const mockMorador = {
                id: 1,
                nome: 'Frederico'
            }

            moradoresRepository.buscarMoradorPorId.mockResolvedValue(mockMorador)

            const result = await getMoradorByIdService(1)

            expect(moradoresRepository.buscarMoradorPorId)
                .toHaveBeenCalledWith(1)

            expect(result).toEqual(mockMorador)
        })


        it('deve lançar erro se o morador não existir', async () => {

            moradoresRepository.buscarMoradorPorId.mockResolvedValue(null)

            await expect(
                getMoradorByIdService(1)
            ).rejects.toThrow('Morador não encontrado')
        })
    })


    describe('updateMoradorService', () => {

        it('deve atualizar um morador', async () => {

            const mockMorador = {
                id: 1,
                nome: 'Frederico'
            }

            moradoresRepository.buscarMoradorPorId
                .mockResolvedValue(mockMorador)

            moradoresRepository.atualizarMorador
                .mockResolvedValue({
                    ...mockMorador,
                    nome: 'Carlos'
                })

            const result = await updateMoradorService(
                1,
                {
                    nome: 'Carlos',
                    bloco: 'B',
                    num_ap: 202,
                    usuario: 'carlos',
                    senha: '123456'
                }
            )

            expect(moradoresRepository.atualizarMorador)
                .toHaveBeenCalled()

            expect(result.nome).toBe('Carlos')
        })


        it('deve lançar erro se o morador não existir', async () => {

            moradoresRepository.buscarMoradorPorId
                .mockResolvedValue(null)

            await expect(
                updateMoradorService(
                    1,
                    {
                        nome: 'Carlos',
                        bloco: 'B',
                        num_ap: 202,
                        usuario: 'carlos',
                        senha: '123456'
                    }
                )
            ).rejects.toThrow('Morador não encontrado')
        })
    })


    describe('deleteMoradorService', () => {

        it('deve deletar um morador', async () => {

            const mockMorador = {
                id: 1,
                nome: 'Frederico'
            }

            moradoresRepository.buscarMoradorPorId
                .mockResolvedValue(mockMorador)

            moradoresRepository.deletarMorador
                .mockResolvedValue(mockMorador)

            const result = await deleteMoradorService(1)

            expect(moradoresRepository.deletarMorador)
                .toHaveBeenCalledWith(1)

            expect(result).toEqual(mockMorador)
        })


        it('deve lançar erro se o morador não existir', async () => {

            moradoresRepository.buscarMoradorPorId
                .mockResolvedValue(null)

            await expect(
                deleteMoradorService(1)
            ).rejects.toThrow('Morador não encontrado')
        })
    })
})