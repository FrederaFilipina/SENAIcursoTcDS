import bcrypt from "bcrypt";
import bd from "../config/database.js";

export async function register(req, res) {
    const { name, email, password } = req.body || {};

    if (
        typeof name !== "string" || name.length <= 3 ||
        typeof email !== "string" || typeof password !== "string"
    ) {
        return res.status(400).json({
            message: "Informe os três campos necessários para o registro"
        });
    }

    const [users] = await bd.query( "SELECT id FROM users WHERE email = ?",[email] );

    if (users.length > 0) {
        return res.status(409).json({ message: "E-mail já cadastrado!" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    try {
        await bd.query( "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)", [name, email, passwordHash] );

    } catch (error) {
        console.error(error);

        return res.status(400).json({ message: "Dados inválidos" });
    }

    return res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
}