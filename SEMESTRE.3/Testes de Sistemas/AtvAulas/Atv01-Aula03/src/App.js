import express from "express"
import { createUser } from "./userService.js"


const app = express()

app.use(express.json())
app.post("/user", (req, res)=> {

    try{
        const newUser = createUser(req.body)
        res.status(201).json(newUser)
    }

    catch (error){
        res.status(400).json({mensagem: error.mensagem})
    }
})

export default app