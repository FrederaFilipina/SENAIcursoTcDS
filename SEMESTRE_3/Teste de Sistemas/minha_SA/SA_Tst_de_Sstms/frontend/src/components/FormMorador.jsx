import { useState } from "react"

export function FormMorador() {

    const [nome, setNome] = useState("")
    const [bloco, setBloco] = useState("A")
    const [numAp, setNumAp] = useState("")
    const [mensagem, setMensagem] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()

        try {

            const response = await fetch("http://localhost:3000/moradores", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome,
                    bloco,
                    num_ap: numAp
                })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error)
            }

            setMensagem(data.mensagem)

            setNome("")
            setBloco("A")
            setNumAp("")

        } catch (error) {
            setMensagem(error.message)
        }
    }

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

            <h2 className="text-2xl font-bold text-center mb-6">
                Cadastro de Morador
            </h2>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
            >

                <input
                    type="text"
                    placeholder="Nome do morador"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500"
                    required
                />

                <select
                    value={bloco}
                    onChange={(e) => setBloco(e.target.value)}
                    className="border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500"
                >
                    <option value="A">Bloco A</option>
                    <option value="B">Bloco B</option>
                </select>

                <input
                    type="text"
                    placeholder="Número do apartamento"
                    value={numAp}
                    onChange={(e) => setNumAp(e.target.value)}
                    className="border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500"
                    required
                />

                <p className="text-sm text-gray-500">
                    Formato válido: 101 até 508
                </p>

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                >
                    Cadastrar
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