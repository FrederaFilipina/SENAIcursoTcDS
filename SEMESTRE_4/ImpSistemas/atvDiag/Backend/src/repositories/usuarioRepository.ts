import type { PrismaClient, Usuario } from "../prisma/generated/prisma/client";
import { prisma } from "../prisma/prisma";

export class UsuarioRepository {

    constructor(private readonly prisma: PrismaClient) {
        this.prisma = prisma;
    }

    /* Lista todos os usuários. */
    async listarTdsUsuarios() {

        return await this.prisma.usuario.findMany({
            orderBy: {
                id: "asc"
            }
        });
    }

    /* Busca um usuário pelo ID. */
    async buscarUsuarioId(idUsuario: number) {

        return await this.prisma.usuario.findUnique({
            where: {
                id: idUsuario
            }
        });
    }

    /* Busca um usuário pelo e-mail. */
    async buscarUsuarioEmail(email: string) {

        return await this.prisma.usuario.findUnique({
            where: {
                email
            }
        });
    }

    /* Cria um novo usuário. */
    async criarUsuario(dadosUsuario: Partial<Usuario>) {

        if (!dadosUsuario.nome) {
            throw new Error(
                "O nome do usuário é obrigatório."
            );
        }

        if (!dadosUsuario.email) {
            throw new Error(
                "O e-mail do usuário é obrigatório."
            );
        }

        if (!dadosUsuario.senha) {
            throw new Error(
                "A senha do usuário é obrigatória."
            );
        }

        const usuarioExistente =
            await this.prisma.usuario.findUnique({
                where: {
                    email: dadosUsuario.email
                }
            });

        if (usuarioExistente) {
            throw new Error(
                "Já existe um usuário cadastrado com este e-mail."
            );
        }

        return await this.prisma.usuario.create({
            data: {
                nome: dadosUsuario.nome,
                email: dadosUsuario.email,
                senha: dadosUsuario.senha
            }
        });
    }

    /* Atualiza os dados de um usuário. */
    async atualizarUsuario(
        idUsuario: number,
        dadosAtualizados: Omit<
            Usuario,
            "id" | "criadoEm" | "atualizadoEm"
        >
    ) {

        const usuarioExistente =
            await this.prisma.usuario.findUnique({
                where: {
                    id: idUsuario
                }
            });

        if (!usuarioExistente) {
            throw new Error(
                "Usuário não encontrado."
            );
        }

        if (
            dadosAtualizados.email &&
            dadosAtualizados.email !== usuarioExistente.email
        ) {

            const emailExistente =
                await this.prisma.usuario.findUnique({
                    where: {
                        email: dadosAtualizados.email
                    }
                });

            if (emailExistente) {
                throw new Error(
                    "Já existe outro usuário cadastrado com este e-mail."
                );
            }
        }

        return await this.prisma.usuario.update({
            where: {
                id: idUsuario
            },
            data: {
                nome: dadosAtualizados.nome,
                email: dadosAtualizados.email,
                senha: dadosAtualizados.senha
            }
        });
    }

    /* Exclui um usuário. */
    async deletarUsuario(idUsuario: number) {

        const usuarioExistente =
            await this.prisma.usuario.findUnique({
                where: {
                    id: idUsuario
                }
            });

        if (!usuarioExistente) {
            throw new Error(
                "Usuário não encontrado."
            );
        }

        return await this.prisma.usuario.delete({
            where: {
                id: idUsuario
            }
        });
    }
}

export const usuarioRepository = new UsuarioRepository(prisma);