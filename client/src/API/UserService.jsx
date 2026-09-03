import axios from "axios";

export default class UserService {
    static getUserData = async () => {
        const token = localStorage.getItem('token');
        return await axios.get('http://localhost:5000/api/user', {headers: {Authorization: `Bearer ${token}`}});
    }
    static searchUsers = async (search, page, limit, cursor) => {
        const token = localStorage.getItem('token');
        return await axios.get('http://localhost:5000/api/user/search', {headers: {Authorization: `Bearer ${token}`}, params: {search, page, limit, cursor}});
    }

    static addUser = async (data) => {
        const token = localStorage.getItem('token');
        return await axios.post(`http://localhost:5000/api/user`, data, {headers: {Authorization: `Bearer ${token}`}});
    }

    static updateUser = async (data) => {
        const token = localStorage.getItem('token');
        return await axios.put('http://localhost:5000/api/user', data, {headers: {Authorization: `Bearer ${token}`}});
    }

    static deleteUser = async (id) => {
        const token = localStorage.getItem('token');
        return await axios.delete('http://localhost:5000/api/user', {headers: {Authorization: `Bearer ${token}`}, data: {id} });
    }
}