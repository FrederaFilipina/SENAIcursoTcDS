
"use client";

import { useEffect, useState } from "react";
import type { Session } from "../services/login";
import { api, errorMessage } from "../services/api";

type AuditLog = {
    id: number;
    usuario: number | null;
    nome_usuario: string | null;
    datahora: string;
    acao: string;
    mesagem: string;
    recurso_afetado: string;
    id_recurso_afetado: number;
    campos_alterados: string;
    valor_anterior: string;
    valor_novo: string;
    ip: string;
    codigo_http: number;
    status_acao: string;
}

type Props = {
    session: Session;
    onBack: () => void;
}

export default function Log({ session, onBack }: Props) {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        async function loadLogs() {
            try {
                const response = await api.get<AuditLog[]>("/logs", {
                    headers: {
                        Authorization: `Bearer ${session.token}`
                    }
                });

                if (active) setLogs(response.data);
            } catch (requestError) {
                if (active) setError(errorMessage(requestError));
            } finally {
                if (active) setLoading(false);
            }
        }

        loadLogs();

        return () => {
            active = false;
        };

    }, [session.token]);

    return (
        <>
            <button
                type="button"
                onClick={onBack}
                className="mb-4 rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700 transition"
            >
                ← Voltar
            </button>

            <h1>Logs para auditoria</h1>
            <p>Os últimos 100 logs, do mais recente para o mais antigo.</p>

            {error && <p>{error}</p>}

            {loading ? (
                <p>Carregando histórico...</p>
            ) : logs.length === 0 ? (
                <p>Nenhum log registrado.</p>
            ) : (
                <ol>
                    {logs.map(entry => (
                        <li key={entry.id}>
                            <p>
                                <strong>Data: </strong>
                                {new Date(entry.datahora).toLocaleString("pt-BR")}
                                &nbsp;
                                <strong>Usuário: </strong>
                                {entry.nome_usuario ?? `ID ${entry.usuario ?? "Desconhecido"}`}
                            </p>

                            <p>
                                <strong>Ação: </strong>
                                {entry.acao ?? " - "}
                                <strong>ID Recurso afetado: </strong>
                                {entry.id_recurso_afetado ?? " - "}
                                <strong>Recurso afetado: </strong>
                                {entry.recurso_afetado ?? " - "}
                                <strong>Status: </strong>
                                {entry.status_acao ?? " - "}
                                {entry.codigo_http ?? " - "}
                            </p>

                            <p>
                                <strong>IP: </strong>
                                {entry.ip ?? " - "}
                                <strong>Campos Alterados: </strong>
                                {entry.campos_alterados ?? "Nenhum"}
                                <strong>Valor Anterior: </strong>
                                {entry.valor_anterior ?? "Não existe"}
                                <strong>Valor Novo: </strong>
                                {entry.valor_novo ?? "Não existe"}
                            </p>
                        </li>
                    ))}
                </ol>
            )}
        </>
    );
}
