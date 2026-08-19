import axios from "axios";

export default class CommentsService {
    static getComments = async (item_id) => {
        const res = await axios.get(`http://localhost:5000/comments/${item_id}`);
        return res.data;
    }
}