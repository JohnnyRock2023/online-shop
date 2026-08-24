import axios from "axios";

export default class CartService {
    static getCart = async (token) => {
        const res = await axios.get(`http://localhost:5000/api/cart`, {headers: {Authorization: `Bearer ${token}`}})
        return res.data
    }

    static isInCart = async (token, item_id) => {
       const res = await CartService.getCart(token)
        return res.data.filter(item => Number(item.id) === Number(item_id)).length > 0;
    }

    static delFromCart = async (token, item_id) => {
        const res = await axios.delete(`http://localhost:5000/api/cart/${item_id}`, {headers: {Authorization: `Bearer ${token}`}});
        return res.data
    }

    static getSummaryCart = (items) => {
        if (!items) return 0;
        let sum = 0;
        items.forEach(item => {sum += Number(item.price) * Number(item.count)});
        return sum
    }

}