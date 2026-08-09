import type { Usuario } from "../prisma/generated/prisma/client";
import { usuarioRepository, type UsuarioRepository } from "../repositories/usuarioRepository";
import { ErroHttp } from "../errors/erroHttp";

export class UsuarioService {

    constructor(private readonly repository: UsuarioRepository) {
        this.repository = repository;
    }

    async listarTdsUsuarios() {

        try {

            return await this.repository.listarTdsUsuarios();

        } catch (error) {

            if (error instanceof ErroHttp) {
                throw error;
            }

            if (error instanceof Error) {
                throw new ErroHttp(
                    `Erro ao listar usuários: ${error.message}`,
                    500
                );
            }

            throw new ErroHttp(
                "Erro desconhecido ao listar usuários.",
                500
            );
        }
    }

    async buscarUsuarioId(idUsuario: number) {

        try {

            const usuario =
                await this.repository.buscarUsuarioId(idUsuario);

            if (!usuario) {
                throw new ErroHttp(
                    "Usuário não encontrado.",
                    404
                );
            }

            return usuario;

        } catch (error) {

            if (error instanceof ErroHttp) {
                throw error;
            }

            if (error instanceof Error) {
                throw new ErroHttp(
                    `Erro ao buscar usuário: ${error.message}`,
                    500
                );
            }

            throw new ErroHttp(
                "Erro desconhecido ao buscar usuário.",
                500
            );
        }
    }

    async buscarUsuarioEmail(email: string) {

        try {

            const usuario =
                await this.repository.buscarUsuarioEmail(email);

            return usuario;

        } catch (error) {

            if (error instanceof ErroHttp) {
                throw error;
            }

            if (error instanceof Error) {
                throw new ErroHttp(
                    `Erro ao buscar usuário por e-mail: ${error.message}`,
                    500
                );
            }

            throw new ErroHttp(
                "Erro desconhecido ao buscar usuário por e-mail.",
                500
            );
        }
    }

    async criarUsuario(dadosUsuario: Usuario) {

        try {

            if (!dadosUsuario.nome?.trim()) {
                throw new ErroHttp(
                    "O nome do usuário é obrigatório.",
                    400
                );
            }

            if (!dadosUsuario.email?.trim()) {
                throw new ErroHttp(
                    "O e-mail do usuário é obrigatório.",
                    400
                );
            }

            if (!dadosUsuario.senha?.trim()) {
                throw new ErroHttp(
                    "A senha do usuário é obrigatória.",
                    400
                );
            }

            return await this.repository.criarUsuario({
                nome: dadosUsuario.nome,
                email: dadosUsuario.email,
                senha: dadosUsuario.senha
            });

        } catch (error) {

            if (error instanceof ErroHttp) {
                throw error;
            }

            if (error instanceof Error) {
                throw new ErroHttp(
                    `Erro ao criar usuário: ${error.message}`,
                    500
                );
            }

            throw new ErroHttp(
                "Erro desconhecido ao criar usuário.",
                500
            );
        }
    }

    async atualizarUsuario(
        idUsuario: number,
        dadosAtualizados: Omit<
            Usuario,
            "id" | "criadoEm" | "atualizadoEm"
        >
    ) {

        try {

            if (!dadosAtualizados.nome?.trim()) {
                throw new ErroHttp(
                    "O nome do usuário é obrigatório.",
                    400
                );
            }

            if (!dadosAtualizados.email?.trim()) {
                throw new ErroHttp(
                    "O e-mail do usuário é obrigatório.",
                    400
                );
            }

            if (!dadosAtualizados.senha?.trim()) {
                throw new ErroHttp(
                    "A senha do usuário é obrigatória.",
                    400
                );
            }

            return await this.repository.atualizarUsuario(
                idUsuario,
                dadosAtualizados
            );

        } catch (error) {

            if (error instanceof ErroHttp) {
                throw error;
            }

            if (error instanceof Error) {
                throw new ErroHttp(
                    `Erro ao atualizar usuário: ${error.message}`,
                    500
                );
            }

            throw new ErroHttp(
                "Erro desconhecido ao atualizar usuário.",
                500
            );
        }
    }

    async deletarUsuario(idUsuario: number) {

        try {

            return await this.repository.deletarUsuario(idUsuario);

        } catch (error) {

            if (error instanceof ErroHttp) {
                throw error;
            }

            if (error instanceof Error) {
                throw new ErroHttp(
                    `Erro ao deletar usuário: ${error.message}`,
                    500
                );
            }

            throw new ErroHttp(
                "Erro desconhecido ao deletar usuário.",
                500
            );
        }
    }
}

export const usuarioService = new UsuarioService(usuarioRepository);