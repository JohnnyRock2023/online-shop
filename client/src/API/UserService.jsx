import axios from "axios";

export default class UserService {
    static getUserData = async () => {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/user', {headers: {Authorization: `Bearer ${token}`}});
        return res.data;
    }
    static searchUsers = async (name) => {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/user/search', {headers: {Authorization: `Bearer ${token}`}, params: {name}});
        return res.data;
    }

    static addUser = async (token, data) => {
        const res = await axios.post(`http://localhost:5000/api/user`, data, {headers: {Authorization: `Bearer ${token}`}});
        return res.data
    }

    static updateUser = async (token, data) => {
        const res = await axios.put('http://localhost:5000/api/user', data, {headers: {Authorization: `Bearer ${token}`}});
        return res.data;
    }

    static deleteUser = async (token, id) => {
        const res = await axios.delete('http://localhost:5000/api/user', {headers: {Authorization: `Bearer ${token}`}, data: {id} });
        return res.data;
    }
}