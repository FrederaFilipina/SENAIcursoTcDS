"use client";

import React, { useState } from "react";

import { login, type Session } from "../services/login";

import Home from "../page/Home";
import Register from "./Register";

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [session, setSession] = useState<Session | null>(null);

    const [error, setError] = useState("");
    const [showRegister, setShowRegister] = useState(false);
    const [notice, setNotice] = useState("");

    const handleLogin = async (event: any) => {
        event.preventDefault();

        setError("");
        setNotice("");

        try {
            const response = await login(email, senha);

            if (!response) {
                setError("E-mail ou senha inválidos.");
                return;
            }

            setSession(response);

            setEmail("");
            setSenha("");

            setNotice("Login efetuado com sucesso!");
        } catch (error) {
            console.error("Erro ao fazer login:", error);

            setError(
                "Não foi possível fazer login. Verifique o e-mail, a senha e a conexão com a API."
            );
        }
    };

    if (session) {
        return (
            <Home
                session={session}
                onLogout={() => {
                    setSession(null);
                    setEmail("");
                    setSenha("");
                    setNotice("");
                }}
            />
        );
    }

    if (showRegister) {
        return (
            <Register
                onBack={() => setShowRegister(false)}
                onRegistered={(message) => {
                    setShowRegister(false);
                    setNotice(message);
                }}
            />
        );
    }

    return (
        <div>
            {notice && (
                <p role="status">
                    {notice}
                </p>
            )}

            {error && (
                <p role="alert">
                    {error}
                </p>
            )}

            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">
                        E-mail
                    </label>

                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="senha">
                        Senha
                    </label>

                    <input
                        type="password"
                        name="senha"
                        id="senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">
                    Entrar
                </button>
            </form>

            <button
                type="button"
                onClick={() => {
                    setError("");
                    setNotice("");
                    setShowRegister(true);
                }}
            >
                Criar conta
            </button>
        </div>
    );
};

export default Login;
