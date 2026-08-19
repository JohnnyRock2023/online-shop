import axios from 'axios';

export default class ItemService {
    static getItems = async () => {
            const res = await axios.get('http://localhost:5000/items');
            return res.data
    }

    static getItem = async (id) => {
            const res = await axios.get(`http://localhost:5000/items/${id}`);
            return res.data
    }

    static addItem = async (token, data) => {
        try {
            const res = await axios.post(`http://localhost:5000/items`, data, {headers: { Authorization: `Bearer ${token}` } });
            return res.data
        }
        catch (error) {
            console.log(error);
        }
    }

    static deleteItem = async (token, id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/items/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            return res.data
        }
        catch (error) {
            console.log(error);
        }
    }

    static changeItem = async (token, id, value) => {
        try {
            const res = await axios.put(`http://localhost:5000/items/${id}`, value, {headers: {Authorization: `Bearer ${token}`}});
            return res.data
        }
        catch (error) {
            console.log(error);
        }
    }

    static addToCart = async (token, item_id, count) => {
            const res = await axios.post(`http://localhost:5000/items/${item_id}`, [item_id, count], {headers: {Authorization: `Bearer ${token}`}});
            return res.data
    }


}