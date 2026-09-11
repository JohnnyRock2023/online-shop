import axios from 'axios';

export default class ProductService {
    static getProducts = async (cursor, page, limit) => {
        return await axios.get(`${import.meta.env.VITE_API_URL}/api/products`, {params: {page, limit, cursor}});
    }

    static getProduct = async (id) => {
        return await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
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

    static addToCart = async (token, product_id, count) => {
        return await axios.post(`${import.meta.env.VITE_API_URL}/api/products/${product_id}`, [product_id, count], {headers: {Authorization: `Bearer ${token}`}});
    }
}