import type { Request, Response } from "express";
import { clienteService, type ClienteService } from "../services/clienteService";
import type { Cliente } from "../prisma/generated/prisma/client";
import { ErroHttp } from "../errors/erroHttp";

export class ClienteController {

    constructor(private readonly service: ClienteService) {
        this.service = service;
    }

    async listarTdsClientes(
        req: Request,
        res: Response
    ) {

        try {

            const clientes =
                await this.service.listarTdsClientes();

            return res.status(200).json(clientes);

        } catch (error) {

            if (error instanceof ErroHttp) {
                return res.status(error.statusCode).json({
                    error: error.message
                });
            }

            return res.status(500).json({
                error: "Erro interno do servidor."
            });
        }
    }

    async buscarClienteId(
        req: Request,
        res: Response
    ) {

        try {

            const idCliente =
                Number(req.params.id);

            const cliente =
                await this.service.buscarClienteId(idCliente);

            return res.status(200).json(cliente);

        } catch (error) {

            if (error instanceof ErroHttp) {
                return res.status(error.statusCode).json({
                    error: error.message
                });
            }

            return res.status(500).json({
                error: "Erro interno do servidor."
            });
        }
    }

    async criarCliente(
        req: Request,
        res: Response
    ) {

        try {

            const dadosCliente =
                req.body as Cliente;

            const clienteCriado =
                await this.service.criarCliente(
                    dadosCliente
                );

            return res.status(201).json(clienteCriado);

        } catch (error) {

            if (error instanceof ErroHttp) {
                return res.status(error.statusCode).json({
                    error: error.message
                });
            }

            return res.status(500).json({
                error: "Erro interno do servidor."
            });
        }
    }

    async atualizarCliente(
        req: Request,
        res: Response
    ) {

        try {

            const idCliente =
                Number(req.params.id);

            const novosDadosCliente =
                req.body as Omit<
                    Cliente,
                    "id" | "criadoEm" | "atualizadoEm"
                >;

            const clienteAtualizado =
                await this.service.atualizarCliente(
                    idCliente,
                    novosDadosCliente
                );

            return res.status(200).json(
                clienteAtualizado
            );

        } catch (error) {

            if (error instanceof ErroHttp) {
                return res.status(error.statusCode).json({
                    error: error.message
                });
            }

            return res.status(500).json({
                error: "Erro interno do servidor."
            });
        }
    }

    async deletarCliente(
        req: Request,
        res: Response
    ) {

        try {

            const idCliente =
                Number(req.params.id);

            const cliente =
                await this.service.deletarCliente(
                    idCliente
                );

            return res.status(200).json({
                mensagem: "Cliente deletado com sucesso!",
                data: cliente
            });

        } catch (error) {

            if (error instanceof ErroHttp) {
                return res.status(error.statusCode).json({
                    error: error.message
                });
            }

            return res.status(500).json({
                error: "Erro interno do servidor."
            });
        }
    }
}

export const clienteController =
    new ClienteController(clienteService);