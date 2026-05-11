import { useEffect, useState } from 'react'

import Navbar from '../components/Navbar'
import FormMorador from '../components/FormMorador'

import {
    getMoradores,
    saveMoradores
} from '../services/localStorage'

function Moradores() {

    const [moradores, setMoradores] = useState([])

    useEffect(() => {

        setMoradores(getMoradores())

    }, [])

    function cadastrarMorador(novoMorador) {

        const novaLista = [
            ...moradores,
            novoMorador
        ]

        saveMoradores(novaLista)

        setMoradores(novaLista)
    }

    function deletarMorador(id) {

        const novaLista = moradores.filter(
            (m) => m.id !== id
        )

        saveMoradores(novaLista)

        setMoradores(novaLista)
    }

    return (

        <div>

            <Navbar />

            <div className="p-10">

                <h1 className="text-3xl font-bold mb-6">
                    Moradores
                </h1>

                <FormMorador
                    onCadastrar={cadastrarMorador}
                />

                <div className="grid gap-4">

                    {moradores.map((morador) => (

                        <div
                            key={morador.id}
                            className="border p-4 rounded shadow"
                        >

                            <h2 className="font-bold">
                                {morador.nome}
                            </h2>

                            <p>
                                Bloco {morador.bloco}
                            </p>

                            <p>
                                AP {morador.num_ap}
                            </p>

                            <button
                                onClick={() =>
                                    deletarMorador(morador.id)
                                }
                                className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Deletar
                            </button>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    )
}

export default Moradores