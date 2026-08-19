import axios from "axios";

export default class UserService {
    static getUserData = async (token) => {
        const res = await axios.get('http://localhost:5000/user', {headers: {Authorization: `Bearer ${token}`}});
        return res.data[0];
    }
    static getAllUsers = async (token) => {
        const res = await axios.get('http://localhost:5000/user/all', {headers: {Authorization: `Bearer ${token}`}});
        return res.data;
    }

    static addUser = async (token, data) => {
        try {
            const res = await axios.post(`http://localhost:5000/user`, data, {headers: {Authorization: `Bearer ${token}`}});
            return res.data
        }
        catch (error) {
            console.log(error);
        }
    }

    static updateUser = async (token, data) => {
        try {
            const res = await axios.put('http://localhost:5000/user', data, {headers: {Authorization: `Bearer ${token}`}});
            return res.data;
        }
        catch (error) {
            console.log(error);
        }
    }

    static deleteUser = async (token, id) => {
        try {
            const res = await axios.delete('http://localhost:5000/user', {headers: {Authorization: `Bearer ${token}`}, data: {id: id} });
            return res.data;
        }
        catch (error) {
            console.log(error);
        }
    }
}