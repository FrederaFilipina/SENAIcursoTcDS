import { useState } from 'react'

import { getUsuarioLogado } from '../services/localStorage'

function FormRecado({ onCriar }) {

    const usuario = getUsuarioLogado()

    const [form, setForm] = useState({
        tipo_recado: '',
        recado: '',
        status: 'ativo'
    })

    function handleSubmit(e) {

        e.preventDefault()

        if (
            !form.tipo_recado ||
            !form.recado
        ) {
            return alert('Preencha todos os campos')
        }

        const novoRecado = {
            id: Date.now(),

            responsavel: usuario.id,

            nome_responsavel: usuario.nome,

            tipo_recado: form.tipo_recado,

            recado: form.recado,

            status: form.status
        }

        onCriar(novoRecado)

        setForm({
            tipo_recado: '',
            recado: '',
            status: 'ativo'
        })
    }

    return (

        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow-md mb-10 grid gap-4"
        >

            <h2 className="text-2xl font-bold">
                Criar Recado
            </h2>

            {/* RESPONSÁVEL */}

            <input
                type="text"
                value={usuario.nome}
                disabled
                className="border p-3 rounded bg-gray-100"
            />

            {/* TIPO */}

            <select
                value={form.tipo_recado}
                onChange={(e) =>
                    setForm({
                        ...form,
                        tipo_recado: e.target.value
                    })
                }
                className="border p-3 rounded"
            >

                <option value="">
                    Selecione o tipo do recado
                </option>

                <option value="Aviso">
                    Aviso
                </option>

                <option value="Manutenção">
                    Manutenção
                </option>

                <option value="Urgente">
                    Urgente
                </option>

                <option value="Condomínio">
                    Condomínio
                </option>

            </select>

            {/* RECADO */}

            <textarea
                placeholder="Digite o recado..."
                value={form.recado}
                onChange={(e) =>
                    setForm({
                        ...form,
                        recado: e.target.value
                    })
                }
                className="border p-4 rounded min-h-[120px]"
            />

            {/* STATUS */}

            <select
                value={form.status}
                onChange={(e) =>
                    setForm({
                        ...form,
                        status: e.target.value
                    })
                }
                className="border p-3 rounded"
            >

                <option value="ativo">
                    Ativo
                </option>

                <option value="inativo">
                    Inativo
                </option>

            </select>

            {/* BOTÃO */}

            <button
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded transition"
            >
                Publicar Recado
            </button>

        </form>
    )
}

export default FormRecado