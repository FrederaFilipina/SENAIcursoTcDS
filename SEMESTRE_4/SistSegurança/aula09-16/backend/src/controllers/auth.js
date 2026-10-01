import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import bd from "../config/database.js";

export async function login(req, res) {
    const { email, senha } = req.body || {};

    if (
        typeof email !== "string" ||
        typeof senha !== "string"
    ) {
        return res.status(400).json({
            message: "E-mail e senha são obrigatórios",
        });
    }

    try {
        const [users] = await bd.query(
            "SELECT id, name, email, password_hash, role FROM users WHERE email = ?",
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({
                message: "E-mail ou senha inválidos",
            });
        }

        const user = users[0];

        const senhaValida = await bcrypt.compare(
            senha,
            user.password_hash
        );

        if (!senhaValida) {
            return res.status(401).json({
                message: "E-mail ou senha inválidos",
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m",
            }
        );

        return res.status(200).json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Erro ao fazer login:", error);

        return res.status(500).json({
            message: "Erro interno ao fazer login",
        });
    }
}