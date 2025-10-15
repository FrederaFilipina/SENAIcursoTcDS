const express = require('express')
const mysql =  require('mysql2')
const app = express()
const port = 3000

const conectar = mysql.createConnection({
    host: '127.0.0.1',
    user: 'atv06_api',
    password: 'root',
    database: 'senai'
})
conectar.connect()
app.post('/cliente', async (req, res) =>{
    const {nome, endereco, email, telefone} = req.body;
    try{
        const [result] = await
        conectar.query(
            'INSERT INTO cliente (nome, endereco, email, telefone) VALUES (?,?,?,?,)', [nome, endereco, email, telefone]
        );
        const [novo_cliente] = await
        conectar.query(
            'SELECT * FROM cliente WHERE id = ?', [result.insertId]
        )
    } catch (errinho){
        console.error(errinho.message)
        res.status(500).json({erro: "DEU ERRO!!!"})
    }
})

app.get('/', (req, res) => {
  res.send('Olá MUNDO!!!')
})

app.listen(port, () => {
  console.log(`OK.... Tah Funcionando 2.0`)
})
