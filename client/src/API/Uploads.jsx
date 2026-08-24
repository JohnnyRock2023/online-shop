
export default class Uploads {
    static getImageLink = (name) => {
        return `http://localhost:5000/api/uploads/${name}`;
    }
}