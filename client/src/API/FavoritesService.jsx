import axios from "axios";

export default class FavoritesService {
    static getFavorites = async (page, limit, cursor) => {
        const token = localStorage.getItem("token");
        return await axios.get(`${import.meta.env.VITE_API_URL}/api/favorites`, {headers: {Authorization: `Bearer ${token}`}, params: {page, limit, cursor}})
    }
    static addFavorite = async (product_id) => {
        const token = localStorage.getItem("token");
        return await axios.post(`${import.meta.env.VITE_API_URL}/api/favorites`, {product_id}, {headers: {Authorization: `Bearer ${token}`}});
    }
    static deleteFavorite = async (product_id) => {
        const token = localStorage.getItem("token");
        return await axios.delete(`${import.meta.env.VITE_API_URL}/api/favorites/${product_id}`,{headers: {Authorization: `Bearer ${token}`}});
    }
}