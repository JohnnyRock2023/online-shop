import axios from "axios";

export default class Authorization {
    static login = async (email, password) => {
        const result = await axios.post('http://localhost:5000/auth/login', {email, password});
        localStorage.setItem("token", result.data.token);
    }

    static signup = async (username, email, password) => {
        const result = await axios.post('http://localhost:5000/auth/signup', {username, email, password});
        localStorage.setItem("token", result.data.token);
    }
}