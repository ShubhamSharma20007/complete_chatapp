
import axios from "axios"
const instance = axios.create({
    // baseURL: "http://localhost:5000/api/v1" 
    baseURL: "https://latest-chat-app.onrender.com/api/v1" 
})
export default instance
