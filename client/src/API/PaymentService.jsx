import axios from 'axios';

export default class PaymentService {
    static processPayment = async (payment_id) => {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/payment/${payment_id}`)
    }
}