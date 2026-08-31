import axios from 'axios';

export default class ItemService {
    static getItems = async (cursor, page, limit) => {
        return await axios.get('http://localhost:5000/api/items', {params: {page, limit, cursor}});
    }

    static getItem = async (id) => {
        return await axios.get(`http://localhost:5000/api/items/${id}`);
    }

    static searchItems = async (search, cursor, page, limit) => {
        return await axios.get(`http://localhost:5000/api/items/search`, {params: {search, page, limit, cursor}});
    }

    static addItem = async (token, data) => {
        return await axios.post(`http://localhost:5000/api/items`, data, {headers: { Authorization: `Bearer ${token}` } });
    }

    static deleteItem = async (token, id) => {
        return await axios.delete(`http://localhost:5000/api/items/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    }

    static changeItem = async (token, id, value) => {
        return await axios.put(`http://localhost:5000/api/items/${id}`, value, {headers: {Authorization: `Bearer ${token}`}});
    }

    static addToCart = async (token, item_id, count) => {
        return await axios.post(`http://localhost:5000/api/items/${item_id}`, [item_id, count], {headers: {Authorization: `Bearer ${token}`}});
    }
}