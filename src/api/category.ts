import axios from "axios";
import type { Category } from "@/types/Category";

const categoryApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

categoryApi.interceptors.request.use(
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


const getCategory = async (): Promise<Category[]> => {
    try {
        const response = await categoryApi.get('/categories')
        return response.data
    } catch (error){
        console.error('Error', error)
        throw error
    }
}

const getParents = async (): Promise<Category[]> => {
    try{
        const response = await categoryApi.get('/categories/parents')
        return response.data
    } catch (error){
        console.error('Error', error)
        throw error
    }
}

const getChild = async (id: string): Promise<Category[]> => {
    try {
        const response =  await categoryApi.get(`/categories/${id}/children`)
        return response.data
    } catch ( error){
        console.error('Error get Child', error)
        throw error;
    }
}

export { getCategory, getParents, getChild }