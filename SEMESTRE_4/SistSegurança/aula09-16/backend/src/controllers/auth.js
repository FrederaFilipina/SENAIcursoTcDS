import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import bd from "../config/database.js";

export async function login(req, res) {
    const { email, password } = req.body || {};

    if (
        typeof email !== "string" ||
        typeof password !== "string" ||
        !email.trim() ||
        !password
    ) {
        return res.status(400).json({
            message: "E-mail ou senha inválidos"
        });
    }

    const [rows] = await bd.query(
        "SELECT id, name, email, password_hash, role FROM users WHERE email = ?",
        [email]
    );

    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        return res.status(401).json({
            message: "E-mail ou senha inválidos"
        });
    }

    const token = jwt.sign(
        { role: user.role },
        process.env.JWT_SECRET,
        {
            subject: String(user.id),
            expiresIn: "1m",
            algorithm: "HS256"
        }
    );

    return res.json({
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        message: "Sucesso! Usuário autenticado"
    });
}