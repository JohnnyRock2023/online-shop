import { useNavigate } from 'react-router-dom';

export const useRequest = () => {
    const navigate = useNavigate();
    const handleRequest = async (request) => {
        try {
            const response = await request();
            return { data: response?.data?.data, error: null };
        } catch (err) {
            console.log(request);
            if (err?.status === 401 || err?.response?.status === 401) {
                if (localStorage.getItem('token') === null) {
                    navigate('/auth/login');
                }
                else {
                    localStorage.removeItem('token');
                }
            }
            const message = err?.response?.data?.message || "Something went wrong";
            return { data: err?.response?.data?.data, error: message };
        }
    };
    return { handleRequest };
};