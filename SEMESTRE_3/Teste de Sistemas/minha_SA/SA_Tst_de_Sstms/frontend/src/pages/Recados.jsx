import { useEffect, useState } from 'react'

import Navbar from '../components/Navbar'
import FormRecado from '../components/FormRecado'

import {
    getRecados,
    saveRecados
} from '../services/localStorage'

function Recados() {

    const [recados, setRecados] = useState([])

    useEffect(() => {

        setRecados(getRecados())

    }, [])

    function criarRecado(novoRecado) {

        const novaLista = [
            ...recados,
            novoRecado
        ]

        saveRecados(novaLista)

        setRecados(novaLista)
    }

    function deletarRecado(id) {

        const novaLista = recados.filter(
            (recado) => recado.id !== id
        )

        saveRecados(novaLista)

        setRecados(novaLista)
    }

    return (

        <div>

            <Navbar />

            <div className="p-10">

                <h1 className="text-3xl font-bold mb-6">
                    Quadro de Recados
                </h1>

                <FormRecado
                    onCriar={criarRecado}
                />

                <div className="grid gap-4">

                    {recados.map((item) => (

                        <div
                            key={item.id}
                            className="bg-white p-5 rounded-xl shadow"
                        >

                            <div className="flex justify-between items-center">

                                <h2 className="text-xl font-bold">
                                    {item.tipo_recado}
                                </h2>

                                <span
                                    className={`
                                        px-3 py-1 rounded text-white text-sm
                                        ${
                                            item.status === 'ativo'
                                                ? 'bg-green-600'
                                                : 'bg-gray-500'
                                        }
                                    `}
                                >
                                    {item.status}
                                </span>

                            </div>

                            <p className="mt-4 text-gray-700">
                                {item.recado}
                            </p>

                            <div className="mt-6 flex justify-between items-center">

                                <p className="text-sm text-gray-500">
                                    Responsável:
                                    {' '}
                                    {item.nome_responsavel}
                                </p>

                                <button
                                    onClick={() =>
                                        deletarRecado(item.id)
                                    }
                                    className="bg-red-600 text-white px-4 py-2 rounded"
                                >
                                    Deletar
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    )
}

export default Recados