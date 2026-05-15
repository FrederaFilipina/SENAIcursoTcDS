import { jest } from '@jest/globals'


jest.unstable_mockModule('../../repositories/recadosRepository.js', () => ({
    criarRecado: jest.fn(),
    listarRecados: jest.fn(),
    buscarRecadoPorId: jest.fn(),
    atualizarRecado: jest.fn(),
    deletarRecado: jest.fn()
}))


const recadosRepository = await import('../../repositories/recadosRepository.js')
const {createRecadoService, getRecadosService, getRecadoByIdService, updateRecadoService, deleteRecadoService} = await import('../../services/recadosServices.js')
const {criarRecado, listarRecados, buscarRecadoPorId, atualizarRecado, deletarRecado} = recadosRepository


describe('Testes dos Services de Recados', () => {

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('createRecadoService', () => {

        it('deve criar um recado com sucesso', async () => {

            const mockRecado = {
                id: 1,
                responsavel: 'Frederico',
                tipo_recado: 'Aviso',
                recado: 'Reunião amanhã',
                status: 'ativo'
            }

            criarRecado.mockResolvedValue(mockRecado)

            const result = await createRecadoService({
                responsavel: 'Frederico',
                tipo_recado: 'Aviso',
                recado: 'Reunião amanhã',
                status: 'ativo'
            })

            expect(criarRecado).toHaveBeenCalled()

            expect(result).toEqual(mockRecado)
        })


        it('deve lançar erro se campos obrigatórios não forem preenchidos', async () => {

            await expect(
                createRecadoService({
                    responsavel: '',
                    tipo_recado: '',
                    recado: ''
                })
            ).rejects.toThrow(
                'Todos os campos obrigatórios devem ser preenchidos'
            )
        })
    })

    describe('getRecadosService', () => {

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

            listarRecados.mockResolvedValue(mockRecados)

            const result = await getRecadosService()

            expect(listarRecados).toHaveBeenCalled()

            expect(result).toEqual(mockRecados)
        })
    })

    describe('getRecadoByIdService', () => {

        it('deve retornar um recado pelo ID', async () => {

            const mockRecado = {
                id: 1,
                responsavel: 'Frederico',
                tipo_recado: 'Aviso',
                recado: 'Teste',
                status: 'ativo'
            }

            buscarRecadoPorId.mockResolvedValue(mockRecado)

            const result = await getRecadoByIdService(1)

            expect(buscarRecadoPorId).toHaveBeenCalledWith(1)

            expect(result).toEqual(mockRecado)
        })


        it('deve lançar erro se recado não existir', async () => {

            buscarRecadoPorId.mockResolvedValue(undefined)

            await expect(
                getRecadoByIdService(1)
            ).rejects.toThrow('Recado não encontrado')
        })
    })

    describe('updateRecadoService', () => {

        it('deve atualizar um recado com sucesso', async () => {

            const recadoExistente = {
                id: 1,
                responsavel: 'Frederico',
                tipo_recado: 'Aviso',
                recado: 'Mensagem antiga',
                status: 'ativo'
            }

            const recadoAtualizado = {
                id: 1,
                responsavel: 'Frederico',
                tipo_recado: 'Urgente',
                recado: 'Mensagem nova',
                status: 'pendente'
            }

            buscarRecadoPorId.mockResolvedValue(recadoExistente)

            atualizarRecado.mockResolvedValue(recadoAtualizado)

            const result = await updateRecadoService(
                1,
                {
                    responsavel: 'Frederico',
                    tipo_recado: 'Urgente',
                    recado: 'Mensagem nova',
                    status: 'pendente'
                }
            )

            expect(buscarRecadoPorId).toHaveBeenCalledWith(1)

            expect(atualizarRecado).toHaveBeenCalled()

            expect(result).toEqual(recadoAtualizado)
        })


        it('deve lançar erro ao tentar atualizar recado inexistente', async () => {

            buscarRecadoPorId.mockResolvedValue(undefined)

            await expect(
                updateRecadoService(
                    1,
                    {
                        responsavel: 'Teste',
                        tipo_recado: 'Aviso',
                        recado: 'Mensagem',
                        status: 'ativo'
                    }
                )
            ).rejects.toThrow('Recado não encontrado')
        })
    })

    describe('deleteRecadoService', () => {

        it('deve deletar um recado com sucesso', async () => {

            const mockRecado = {
                id: 1,
                responsavel: 'Frederico',
                tipo_recado: 'Aviso',
                recado: 'Mensagem',
                status: 'ativo'
            }

            buscarRecadoPorId.mockResolvedValue(mockRecado)

            deletarRecado.mockResolvedValue(mockRecado)

            const result = await deleteRecadoService(1)

            expect(buscarRecadoPorId).toHaveBeenCalledWith(1)

            expect(deletarRecado).toHaveBeenCalledWith(1)

            expect(result).toEqual(mockRecado)
        })


        it('deve lançar erro ao tentar deletar recado inexistente', async () => {

            buscarRecadoPorId.mockResolvedValue(undefined)

            await expect(
                deleteRecadoService(1)
            ).rejects.toThrow('Recado não encontrado')
        })
    })
})