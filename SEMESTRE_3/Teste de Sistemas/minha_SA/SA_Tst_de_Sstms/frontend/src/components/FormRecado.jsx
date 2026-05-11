import { useState } from "react"

export function FormRecado() {

    const [responsavel, setResponsavel] = useState("")
    const [tipoRecado, setTipoRecado] = useState("aviso")
    const [recado, setRecado] = useState("")
    const [status, setStatus] = useState("ativo")
    const [mensagem, setMensagem] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()

        try {

            const response = await fetch("http://localhost:3000/recados", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    responsavel,
                    tipo_recado: tipoRecado,
                    recado,
                    status
                })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error)
            }

            setMensagem(data.mensagem)

            setResponsavel("")
            setTipoRecado("aviso")
            setRecado("")
            setStatus("ativo")

        } catch (error) {
            setMensagem(error.message)
        }
    }

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">

            <h2 className="text-2xl font-bold text-center mb-6">
                Cadastro de Recados
            </h2>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
            >

                <input
                    type="text"
                    placeholder="Responsável"
                    value={responsavel}
                    onChange={(e) => setResponsavel(e.target.value)}
                    className="border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500"
                    required
                />

                <select
                    value={tipoRecado}
                    onChange={(e) => setTipoRecado(e.target.value)}
                    className="border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500"
                >
                    <option value="aviso">Aviso</option>
                    <option value="manutencao">Manutenção</option>
                    <option value="reuniao">Reunião</option>
                    <option value="informativo">Informativo</option>
                </select>

                <textarea
                    placeholder="Digite o recado"
                    value={recado}
                    onChange={(e) => setRecado(e.target.value)}
                    rows={5}
                    className="border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500 resize-none"
                    required
                />

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500"
                >
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                </select>

                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
                >
                    Publicar Recado
                </button>

            </form>

            {
                mensagem && (
                    <div className="mt-4 text-center text-sm font-medium">
                        {mensagem}
                    </div>
                )
            }

        </div>
    )
}