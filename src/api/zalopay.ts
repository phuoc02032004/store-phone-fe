import axios from "axios";
import type { ZaloPay } from "@/types/Zalopay";

const zaloApi = axios.create({
     baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

zaloApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)


const createZaloPay = async (id: string): Promise<ZaloPay> => {
    try{
        const response = await zaloApi.post(`/zaloPay/create/${id}`)
        return response.data;
    } catch(error){
        console.error('Error create Zalo Pay QR', error)
        throw error
    }
}

export {createZaloPay};