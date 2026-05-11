import { Link } from "react-router-dom"
import { FormRecado } from "../components/FormRecado"

export function Recado() {

    return (
        <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-6 p-4">

            <div className="flex gap-4">

                <Link
                    to="/"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    Moradores
                </Link>

                <Link
                    to="/recado"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                    Recados
                </Link>

            </div>

            <FormRecado />

        </main>
    )
}