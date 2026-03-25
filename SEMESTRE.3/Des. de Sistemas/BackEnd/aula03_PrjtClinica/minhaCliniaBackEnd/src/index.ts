import express from 'express'

const port = 3000
const app = express()

app.get('/', (req, res) => {
    console.log(req)
    res.send("Olá, meu Mundo! ^^")
})


app.listen(port, ()=>{
  console.log("Servidor ativado e Online")  
})