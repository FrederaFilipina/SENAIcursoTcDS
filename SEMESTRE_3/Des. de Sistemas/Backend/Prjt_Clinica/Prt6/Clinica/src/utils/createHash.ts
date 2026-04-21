import bcrypt from "bcrypt"

const saltRound = 10

export async function creatHash(senha: string) {
    return await bcrypt.hash(senha, saltRound)
}