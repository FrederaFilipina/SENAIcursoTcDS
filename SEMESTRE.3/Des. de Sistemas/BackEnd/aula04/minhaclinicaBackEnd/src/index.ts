import express from 'express'

const port = 3000
const app = express()


app.get('/', (_, res) => {
    res.send("Olá, Meu Mundo!")
})


app.listen(port, ()=>{
  console.log("Servidor ativado e online")  
})