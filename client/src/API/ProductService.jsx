import axios from 'axios';

export default class ProductService {
    static getProducts = async (cursor, page, limit) => {
        const token = localStorage.getItem('token');
        return await axios.get(`${import.meta.env.VITE_API_URL}/api/products`, {headers: { Authorization: `Bearer ${token}` }, params: {page, limit, cursor}});
    }

    static getProduct = async (id) => {
        const token = localStorage.getItem('token');
        return await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {headers: { Authorization: `Bearer ${token}` }});
    }

    static searchProducts = async (search, cursor, page, limit) => {
        return await axios.get(`${import.meta.env.VITE_API_URL}/api/products/search`, {params: {search, page, limit, cursor}});
    }

    static addProduct = async (token, data) => {
        return await axios.post(`${import.meta.env.VITE_API_URL}/api/products`, data, {headers: { Authorization: `Bearer ${token}` } });
    }

    static deleteProduct = async (token, id) => {
        return await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    }

    static changeProduct = async (token, id, value) => {
        return await axios.put(`${import.meta.env.VITE_API_URL}/api/products/${id}`, value, {headers: {Authorization: `Bearer ${token}`}});
    }
}