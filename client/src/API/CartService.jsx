import axios from "axios";

export default class CartService {
    static getCart = async (token) => {
        return await axios.get(`${import.meta.env.VITE_API_URL}/api/cart`, {headers: {Authorization: `Bearer ${token}`}})

    }
    static isInCart = async (token, item_id) => {
       const res = await CartService.getCart(token)
       return {data: res.data.data.filter(item => Number(item.id) === Number(item_id)).length > 0};
    }

    static delFromCart = async (token, item_id) => {
       return await axios.delete(`${import.meta.env.VITE_API_URL}/api/cart/${item_id}`, {headers: {Authorization: `Bearer ${token}`}});
    }

    static addToCart = async (token, product_id, count) => {
        return await axios.post(`${import.meta.env.VITE_API_URL}/api/cart/${product_id}`, [product_id, count], {headers: {Authorization: `Bearer ${token}`}});
    }

    static getSummaryCart = (items) => {
        if (!items) return 0;
        let sum = 0;
        items.forEach(item => {sum += Number(item.price) * Number(item.count)});
        return sum
    }

}