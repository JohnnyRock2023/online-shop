import axios from "axios";

export default class UserService {
    static getUserData = async () => {
        const token = localStorage.getItem('token');
        return await axios.get(`${import.meta.env.VITE_API_URL}/api/user`, {headers: {Authorization: `Bearer ${token}`}});
    }
    static searchUsers = async (search, page, limit, cursor) => {
        const token = localStorage.getItem('token');
        return await axios.get(`${import.meta.env.VITE_API_URL}/api/user/search`, {headers: {Authorization: `Bearer ${token}`}, params: {search, page, limit, cursor}});
    }

    static addUser = async (data) => {
        const token = localStorage.getItem('token');
        return await axios.post(`${import.meta.env.VITE_API_URL}/api/user`, data, {headers: {Authorization: `Bearer ${token}`}});
    }

    static updateUser = async (data) => {
        const token = localStorage.getItem('token');
        return await axios.put(`${import.meta.env.VITE_API_URL}/api/user`, data, {headers: {Authorization: `Bearer ${token}`}});
    }

    static deleteUser = async (id) => {
        const token = localStorage.getItem('token');
        return await axios.delete(`${import.meta.env.VITE_API_URL}/api/user`, {headers: {Authorization: `Bearer ${token}`}, data: {id} });
    }
}