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

const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
        const response = await axiosClient.patch('/auth/changepassword', { oldPassword, newPassword });
        return response.data;
    } catch (error) {
        console.error('Error changing password:', error);
        throw error;
    }
}

const forgotPassword = async ( email: string ) => {
    try{
        const response = await axiosClient.post(`/auth/forgotpassword`, {email});
        return response.data 
    } catch (error) {
        console.error('Error forgot password', error )
        throw error
    }
}

const resetPassword = async ( email:string, resetToken:string, newPassword: string) => {
    try {
        const response = await axiosClient.put(`/auth/resetpassword`, {email, resetToken, newPassword});
        return response.data
    } catch (error) {
        console.error('Error reset password', error);
        throw error
    }
}

const verifyEmail = async (email:string, verificationCode: string) => {
    try{
        const response = await axiosClient.post(`/auth/verify-email`, {email, verificationCode});
        return response.data
    } catch (error) {
        console.error('Error verify mail', error);
        throw error
    }
}
    
export { login, register, changePassword, forgotPassword, resetPassword, verifyEmail };