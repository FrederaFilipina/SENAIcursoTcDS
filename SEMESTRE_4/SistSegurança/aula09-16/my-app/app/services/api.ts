import axios from "axios"


export const api = axios.create({
    baseURL: process.env.BASE_URL || "http://localhost:8081/api"
})

export function errorMessage(error: unknown): string{
    if(axios.isAxiosError(error) && error.response?.data.message)
        return error.response.data.message

    return "Não foi possivel conectar a aPI, Verifique o seu Back-end"
}