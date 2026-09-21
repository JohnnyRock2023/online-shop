import axios from "axios";

export default class OrderService {
    static getOrders = async (page, limit, cursor, filter) => {
        const token = localStorage.getItem("token");
        return await axios.get(`${import.meta.env.VITE_API_URL}/api/orders`, {headers: {Authorization: `Bearer ${token}`}, params: {page, limit, cursor, filter}});
    }
    static getOrder = async (order_id) => {
        const token = localStorage.getItem("token");
        return await axios.get(`${import.meta.env.VITE_API_URL}/api/orders/${order_id}`, {headers: {Authorization: `Bearer ${token}`}})
    }
    static addOrder = async (cart) => {
        const token = localStorage.getItem("token");
        const products = cart.map(e => ({id: Number(e.id), count: Number(e.count)}));
        return await axios.post(`${import.meta.env.VITE_API_URL}/api/orders`, products, {headers: {Authorization: `Bearer ${token}`}})
    }
    static deleteOrder = async (order_id) => {
        const token = localStorage.getItem("token");
        return await axios.delete(`${import.meta.env.VITE_API_URL}/api/orders/${order_id}`,{headers: {Authorization: `Bearer ${token}`}})
    }
}