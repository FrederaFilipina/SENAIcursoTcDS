import { useState } from "react"
import { create } from "../services/user"


const FormUser = () => {

    const [form, setForm] = useState({
        nome: "",
        cpf: "",
        email: "",
        senha: ""
    })

    const [erros, setErros] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    }

    const validaFormulario = () => {
        const novosErros = {}

        //nome
        if (!form.nome || form.nome.trim().length < 3) {
            novosErros.nome = "O campo nome é obrigatório e deve ter no mínimo 3 caracteres"
        }

        //cpf
        if (!form.cpf || form.cpf.trim().length !== 11) {
            novosErros.cpf = "O campo cpf é obrigatório e deve ter 11 caracteres"
        }

        //email
        if (!form.email || form.email.includes('@')) {
            novosErros.email = "O campo e-mail é obrigatório e deve ser um e-mail válido"
        }

        //senha
        if (!form.senha || form.senha.trim.length < 8 || form.senha.trim.length > 32) {
            novosErros.senha = "O campo senha é obrigatório e deve ter entre 8 e 32 caracteres"
        }


        setErros(novosErros);

        return Object.keys(novosErros).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validaFormulario()) {

            alert('Ocorreu um erro')

        }


        try {
            const resultado = await create(form)
            console.log("Resultado:", resultado)
        } catch (error) {
            console.log("Ocorreu um erro ao enviar a requisição:", error)
        }
    }

    return (
        <div>
            <h1>Cadastro de usuário</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nome">Nome</label>
                    <input type="text" name="nome" id="nome" value={form.nome}
                        onChange={handleChange} placeholder="Digite seu nome completo" />

                    {erros.nome && (
                        <p style={{ color: '#f00' }}>{erros.nome}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="cpf">CPF</label>
                    <input type="text" name="cpf" id="cpf" value={form.cpf}
                        onChange={handleChange} placeholder="XXX.XXX.XXX-XX" />

                    {erros.cpf && (
                        <p style={{ color: '#f00' }}>{erros.cpf}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="email">E-mail</label>
                    <input type="email" name="email" id="email" value={form.email}
                        onChange={handleChange} placeholder="e-mail@email.com" />

                    {erros.email && (
                        <p style={{ color: '#f00' }}>{erros.email}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="senha">Sennha</label>
                    <input type="text" name="senha" id="senha" value={form.senha}
                        onChange={handleChange} placeholder="Digite sua senha de 8 a 32 caracteres" />

                    {erros.senha && (
                        <p style={{ color: '#f00' }}>{erros.senha}</p>
                    )}
                </div>






                <button type="submit"> Cadastrar</button>

            </form>
        </div>
    )
}

export default FormUser