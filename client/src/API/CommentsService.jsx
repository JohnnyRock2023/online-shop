
import axios from "axios";

export default class CommentsService {

    static getComments = async (item_id, cursor, page, limit) => {
       return await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${item_id}/comments`, {params: {page, limit, cursor}});

    }
    static addComment = async (item_id, data) => {
        const token = localStorage.getItem("token");
        return await axios.post(`${import.meta.env.VITE_API_URL}/api/products/${item_id}/comments`, {data}, {headers: {Authorization: `Bearer ${token}`}});
    }

    static deleteComment = async (comment_id) => {
        const token = localStorage.getItem("token");
        return await axios.delete(`${import.meta.env.VITE_API_URL}/api/comments/${comment_id}`, {headers: {Authorization: `Bearer ${token}`}});
    }
}