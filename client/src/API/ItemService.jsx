import axios from 'axios';

export default class ItemService {
    static getItems = async (page, limit) => {
        const res = await axios.get('http://localhost:5000/api/items', {params: {_page: page, _limit: limit}});
        return res.data
    }

    static getItem = async (id) => {
        const res = await axios.get(`http://localhost:5000/api/items/${id}`);
        return res.data
    }

    static searchItems = async (name) => {
        const res = await axios.get(`http://localhost:5000/api/items/search`, {params: {name}});
        console.log(res)
        return res.data
    }

    static addItem = async (token, data) => {
        const res = await axios.post(`http://localhost:5000/api/items`, data, {headers: { Authorization: `Bearer ${token}` } });
        return res.data
    }

    static deleteItem = async (token, id) => {
        const res = await axios.delete(`http://localhost:5000/api/items/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        return res.data
    }

    static changeItem = async (token, id, value) => {
        const res = await axios.put(`http://localhost:5000/api/items/${id}`, value, {headers: {Authorization: `Bearer ${token}`}});
        return res.data
    }

    static addToCart = async (token, item_id, count) => {
        const res = await axios.post(`http://localhost:5000/api/items/${item_id}`, [item_id, count], {headers: {Authorization: `Bearer ${token}`}});
        return res.data
    }
}