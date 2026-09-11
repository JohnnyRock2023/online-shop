
export default class Uploads {
    static getImageLink = (name) => {
        return `${import.meta.env.VITE_API_URL}/api/uploads/${name}`;
    }
}