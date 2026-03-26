import bcrypt from "bcrypt"

const senha = "123456"
const saltRounds = 10


const hahs1 = await bcrypt.hash(senha, saltRounds)
console.log("Senha UM:", hahs1)

const hahs2 = await bcrypt.hash(senha, saltRounds)
console.log("Senha DOIS:", hahs2)


const isMatch = await bcrypt.compare("123456", hahs1)
console.log("Validaçao:", isMatch)