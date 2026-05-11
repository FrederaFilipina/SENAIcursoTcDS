import { useState } from 'react'

function FormMorador({ onCadastrar }) {

    const [form, setForm] = useState({
        nome: '',
        bloco: '',
        num_ap: '',
        usuario: '',
        senha: ''
    })

    function handleSubmit(e) {

        e.preventDefault()

        if (
            !form.nome ||
            !form.bloco ||
            !form.num_ap ||
            !form.usuario ||
            !form.senha
        ) {
            return alert('Preencha todos os campos')
        }

        if (
            form.bloco !== 'A' &&
            form.bloco !== 'B'
        ) {
            return alert('Bloco inválido')
        }

        const regexApartamento = /^[1-5]0[1-8]$/

        if (!regexApartamento.test(form.num_ap)) {
            return alert('Apartamento inválido')
        }

        onCadastrar({
            id: Date.now(),
            ...form
        })

        setForm({
            nome: '',
            bloco: '',
            num_ap: '',
            usuario: '',
            senha: ''
        })
    }

    return (

        <form
            onSubmit={handleSubmit}
            className="grid gap-4 mb-10"
        >

            <input
                placeholder="Nome"
                className="border p-3 rounded"
                value={form.nome}
                onChange={(e) =>
                    setForm({
                        ...form,
                        nome: e.target.value
                    })
                }
            />

            <select
                className="border p-3 rounded"
                value={form.bloco}
                onChange={(e) =>
                    setForm({
                        ...form,
                        bloco: e.target.value
                    })
                }
            >

                <option value="">
                    Selecione o bloco
                </option>

                <option value="A">
                    A
                </option>

                <option value="B">
                    B
                </option>

            </select>

            <input
                placeholder="Apartamento"
                className="border p-3 rounded"
                value={form.num_ap}
                onChange={(e) =>
                    setForm({
                        ...form,
                        num_ap: e.target.value
                    })
                }
            />

            <input
                placeholder="Usuário"
                className="border p-3 rounded"
                value={form.usuario}
                onChange={(e) =>
                    setForm({
                        ...form,
                        usuario: e.target.value
                    })
                }
            />

            <input
                type="password"
                placeholder="Senha"
                className="border p-3 rounded"
                value={form.senha}
                onChange={(e) =>
                    setForm({
                        ...form,
                        senha: e.target.value
                    })
                }
            />

            <button
                className="bg-green-600 text-white p-3 rounded"
            >
                Cadastrar
            </button>

        </form>
    )
}

export default FormMorador