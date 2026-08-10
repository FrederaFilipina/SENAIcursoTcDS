import { useEffect } from "react";
import apiClient from "./api/apiClient";

function App() {
    useEffect(() => {
        apiClient
            .get("/clientes")
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Erro ao conectar com o backend:", error);
            });
    }, []);

    return (
        <h1>Frontend conectado!</h1>
    );
}

export default App;