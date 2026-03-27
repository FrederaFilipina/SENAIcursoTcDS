import express from "express"

const port = 3000
const app = express()

app.get('/', (_,res) =>{
    res.send('Olá, meu Mundinho!')
})

app.listen(port, () =>{
    console.log('Servidor ativado e ONLINE!')
})