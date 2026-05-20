import axios from "axios"

const minhaSA = axios.create({
  baseURL: "http://localhost:3001"
})

export default minhaSA