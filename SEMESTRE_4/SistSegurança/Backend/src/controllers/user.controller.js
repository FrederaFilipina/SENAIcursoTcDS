import db from "../config/database.js";

export const createUser = async (req, res) => {
    const { nome, email, cpf, senha } = req.body;

    // === === === === ===
    // VALIDAÇÃO
    // === === === === ===


    if (!nome || typeof nome !== "string" || nome.trim().length <= 3) {
        return res.status(400).json({
            message: "Nome inválido. Este campo é obrigatório, preencha com o seu nome completo.",
            success: false
        })
    }
    if (!email || typeof email !== "string" || !email.includes('@') || email.trim().length > 150) {
        return res.status(400).json({
            message: "E-mail inválido. Este campo é obrigatório.",
            success: false
        })
    }
    if (!cpf || typeof cpf !== "string") {
        return res.status(400).json({
            message: "CPF inválido. Este campo é obrigatório.",
            success: false
        })
    }
    if (!senha) {
        return res.status(400).json({
            message: "SENHA inválida. Este campo é obrigatório",
            success: false
        })
    } else {

        //precisa ter entre 8 e 32 caracteres
        if (senha.length < 8 && senha.length > 32) {
            return res.status(400).json({
                menssage: "Senha inválida.",
                success: false
            })
        }
    }


    // === === === === ===
    // SANITIZAÇÃO
    // === === === === ===

    if (!validarCPF(cpf)) {
        return res.status(400).json({
            message: "CPF inválido",
            success: false
        })
    }

    //remove -(hifen), .(ponto)
    const cpfLimpo = cpf.replace(/\D/g, "")
    

    //limpa o nome de qualquer caractere indesejado
    const nomeSanitizado = nome.trim().replace(/\s+/g, "")

    // inserção no banco
    
    try {
        const sql = `INSERT INTO usuario (nome, email, senha, cpf) VALUES(?,?,?,?)`

        const valores = [nomeSanitizado, email, senha, cpfLimpo]

        const [result] = await db.execute(sql, valores)

        if (result.affectedRows === 0) {
            return res.status(400).json({
                message: "Não foi possível inserir os dados do usuário",
                success: false
            })
        }

        return res.status(201).json({ message: "Usuario criado com sucesso", success: true })

    } catch (e) {
        
        res.status(500).json({ menssage: "Erro interno", success: false, erro: e })
    }


}


function validarCPF(cpf) {
  if (/^(\d)\1+$/.test(cpf)) return false;
  
  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  
  resto = (soma * 10) % 11;
  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  
  resto = (soma * 10) % 11;
  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}

