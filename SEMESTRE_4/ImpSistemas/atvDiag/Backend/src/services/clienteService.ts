import type { Cliente } from "../prisma/generated/prisma/client";
import { clienteRepository, type ClienteRepository } from "../repositories/clienteRepository";
import { ErroHttp } from "../errors/erroHttp";

export class ClienteService {

    constructor(private readonly repository: ClienteRepository) {
        this.repository = repository;
    }

    /* Lista todos os clientes. */
    async listarTdsClientes() {

        try {

            return await this.repository.listarTdsClientes();

        } catch (error) {

            if (error instanceof ErroHttp) {
                throw error;
            }

            if (error instanceof Error) {
                throw new ErroHttp(
                    `Erro ao listar clientes: ${error.message}`,
                    500
                );
            }

            throw new ErroHttp(
                "Erro desconhecido ao listar clientes.",
                500
            );
        }
    }

    /* Busca um cliente pelo ID. */
    async buscarClienteId(idCliente: number) {

        try {

            if (!idCliente || idCliente <= 0) {
                throw new ErroHttp(
                    "ID do cliente inválido.",
                    400
                );
            }

            const cliente =
                await this.repository.buscarClienteId(idCliente);

            if (!cliente) {
                throw new ErroHttp(
                    "Cliente não encontrado.",
                    404
                );
            }

            return cliente;

        } catch (error) {

            if (error instanceof ErroHttp) {
                throw error;
            }

            if (error instanceof Error) {
                throw new ErroHttp(
                    `Erro ao buscar cliente: ${error.message}`,
                    500
                );
            }

            throw new ErroHttp(
                "Erro desconhecido ao buscar cliente.",
                500
            );
        }
    }

    /* Cria um novo cliente. */
    async criarCliente(dadosCliente: Cliente) {

        try {

            if (!dadosCliente.nome?.trim()) {
                throw new ErroHttp(
                    "O nome do cliente é obrigatório.",
                    400
                );
            }

            if (!dadosCliente.telefone?.trim()) {
                throw new ErroHttp(
                    "O telefone do cliente é obrigatório.",
                    400
                );
            }

            if (!dadosCliente.rua?.trim()) {
                throw new ErroHttp(
                    "A rua do cliente é obrigatória.",
                    400
                );
            }

            if (!dadosCliente.numero?.trim()) {
                throw new ErroHttp(
                    "O número do endereço é obrigatório.",
                    400
                );
            }

            if (!dadosCliente.bairro?.trim()) {
                throw new ErroHttp(
                    "O bairro do cliente é obrigatório.",
                    400
                );
            }

            return await this.repository.criarCliente({
                nome: dadosCliente.nome,
                telefone: dadosCliente.telefone,
                rua: dadosCliente.rua,
                numero: dadosCliente.numero,
                bairro: dadosCliente.bairro,
                observacoes: dadosCliente.observacoes || ""
            });

        } catch (error) {

            if (error instanceof ErroHttp) {
                throw error;
            }

            if (error instanceof Error) {
                throw new ErroHttp(
                    `Erro ao criar cliente: ${error.message}`,
                    500
                );
            }

            throw new ErroHttp(
                "Erro desconhecido ao criar cliente.",
                500
            );
        }
    }

    /* Atualiza os dados de um cliente. */
    async atualizarCliente(
        idCliente: number,
        dadosAtualizados: Omit<
            Cliente,
            "id" | "criadoEm" | "atualizadoEm"
        >
    ) {

        try {

            if (!idCliente || idCliente <= 0) {
                throw new ErroHttp(
                    "ID do cliente inválido.",
                    400
                );
            }

            if (!dadosAtualizados.nome?.trim()) {
                throw new ErroHttp(
                    "O nome do cliente é obrigatório.",
                    400
                );
            }

            if (!dadosAtualizados.telefone?.trim()) {
                throw new ErroHttp(
                    "O telefone do cliente é obrigatório.",
                    400
                );
            }

            if (!dadosAtualizados.rua?.trim()) {
                throw new ErroHttp(
                    "A rua do cliente é obrigatória.",
                    400
                );
            }

            if (!dadosAtualizados.numero?.trim()) {
                throw new ErroHttp(
                    "O número do endereço é obrigatório.",
                    400
                );
            }

            if (!dadosAtualizados.bairro?.trim()) {
                throw new ErroHttp(
                    "O bairro do cliente é obrigatório.",
                    400
                );
            }

            return await this.repository.atualizarCliente(
                idCliente,
                dadosAtualizados
            );

        } catch (error) {

            if (error instanceof ErroHttp) {
                throw error;
            }

            if (error instanceof Error) {
                throw new ErroHttp(
                    `Erro ao atualizar cliente: ${error.message}`,
                    500
                );
            }

            throw new ErroHttp(
                "Erro desconhecido ao atualizar cliente.",
                500
            );
        }
    }

    /* Exclui um cliente. */
    async deletarCliente(idCliente: number) {

        try {

            if (!idCliente || idCliente <= 0) {
                throw new ErroHttp(
                    "ID do cliente inválido.",
                    400
                );
            }

            return await this.repository.deletarCliente(idCliente);

        } catch (error) {

            if (error instanceof ErroHttp) {
                throw error;
            }

            if (error instanceof Error) {
                throw new ErroHttp(
                    `Erro ao deletar cliente: ${error.message}`,
                    500
                );
            }

            throw new ErroHttp(
                "Erro desconhecido ao deletar cliente.",
                500
            );
        }
    }
}

export const clienteService =
    new ClienteService(clienteRepository);