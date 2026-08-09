import type { Cliente, PrismaClient } from "../prisma/generated/prisma/client";
import { prisma } from "../prisma/prisma";

export class ClienteRepository {

    constructor(private readonly prisma: PrismaClient) {
        this.prisma = prisma;
    }

    /* Lista todos os clientes. */
    async listarTdsClientes() {

        return await this.prisma.cliente.findMany({
            orderBy: {
                id: "asc"
            }
        });
    }

    /* Busca um cliente pelo ID. */
    async buscarClienteId(idCliente: number) {

        return await this.prisma.cliente.findUnique({
            where: {
                id: idCliente
            }
        });
    }

    /* Cria um novo cliente. */
    async criarCliente(dadosCliente: Partial<Cliente>) {

        if (!dadosCliente.nome) {
            throw new Error(
                "O nome do cliente é obrigatório."
            );
        }

        if (!dadosCliente.telefone) {
            throw new Error(
                "O telefone do cliente é obrigatório."
            );
        }

        if (!dadosCliente.rua) {
            throw new Error(
                "A rua do cliente é obrigatória."
            );
        }

        if (!dadosCliente.numero) {
            throw new Error(
                "O número do endereço é obrigatório."
            );
        }

        if (!dadosCliente.bairro) {
            throw new Error(
                "O bairro do cliente é obrigatório."
            );
        }

        return await this.prisma.cliente.create({
            data: {
                nome: dadosCliente.nome,
                telefone: dadosCliente.telefone,
                rua: dadosCliente.rua,
                numero: dadosCliente.numero,
                bairro: dadosCliente.bairro,
                observacoes: dadosCliente.observacoes || ""
            }
        });
    }

    /* Atualiza os dados de um cliente. */
    async atualizarCliente(
        idCliente: number,
        dadosAtualizados: Omit<
            Cliente,
            "id" | "criadoEm" | "atualizadoEm"
        >
    ) {

        const clienteExistente =
            await this.prisma.cliente.findUnique({
                where: {
                    id: idCliente
                }
            });

        if (!clienteExistente) {
            throw new Error(
                "Cliente não encontrado."
            );
        }

        return await this.prisma.cliente.update({
            where: {
                id: idCliente
            },
            data: {
                nome: dadosAtualizados.nome,
                telefone: dadosAtualizados.telefone,
                rua: dadosAtualizados.rua,
                numero: dadosAtualizados.numero,
                bairro: dadosAtualizados.bairro,
                observacoes: dadosAtualizados.observacoes
            }
        });
    }

    /* Exclui um cliente. */
    async deletarCliente(idCliente: number) {

        const clienteExistente =
            await this.prisma.cliente.findUnique({
                where: {
                    id: idCliente
                }
            });

        if (!clienteExistente) {
            throw new Error(
                "Cliente não encontrado."
            );
        }

        return await this.prisma.cliente.delete({
            where: {
                id: idCliente
            }
        });
    }
}

export const clienteRepository =
    new ClienteRepository(prisma);