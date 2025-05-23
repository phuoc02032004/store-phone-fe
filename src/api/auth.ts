import axios from "axios";

const authApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

authApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const login = async (email: string, password: string) => {
    try {
        const response = await authApi.post('/auth/login', { email, password });
        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

const register = async (email: string, password: string, username: string) => {
    try {
        const response = await authApi.post('/auth/register', { email, password, username });
        return response.data;
        } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};
  
export { login, register };