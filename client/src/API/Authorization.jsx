import axios from "axios";

export default class Authorization {
    static login = async (email, password) => {
        const result = await axios.post('http://localhost:5000/api/auth/login', {email, password});
        localStorage.setItem("token", result.data.token);
        return result;
    }

    static signup = async (username, email, password) => {
        const result = await axios.post('http://localhost:5000/api/auth/signup', {username, email, password});
        localStorage.setItem("token", result.data.token);
        return result;
    }
}