import axios from "axios";

const minhaSA = axios.create ({
    baseURL: 'http://localhost:3000'
})

export default minhaSA