import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/api",
});

export function errorMessage(error: unknown): string {
    if (
        axios.isAxiosError(error) &&
        error.response?.data?.message
    ) {
        return error.response.data.message;
    }

    return "Não foi possível conectar à API. Verifique o seu Back-end.";
}