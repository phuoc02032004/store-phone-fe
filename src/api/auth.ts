import axiosClient from "./axiosClient";

const login = async (email: string, password: string) => {
    try {
        const response = await axiosClient.post('/auth/login', { email, password });
        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

const register = async (email: string, password: string, username: string) => {
    try {
        const response = await axiosClient.post('/auth/register', { email, password, username });
        return response.data;
        } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};
  
export { login, register };