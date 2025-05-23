import axios from 'axios'
import type { Product } from '@/types/Product'

const productApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

productApi.interceptors.request.use(
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

const getProducts = async (params?: { isNewArrival?: boolean; isBestSeller?: boolean }): Promise<Product[]> => {
    try {
        const response = await productApi.get('/products', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

const getProductbyCategory = async (category: string): Promise<Product[]> => {
    try {
        const response = await productApi.get(`/products/category/${category}`)
        return response.data
        } catch (error) {
        console.error('Error fetching products:', error)
        throw error
    }
};

const getProductbyId = async (id: string): Promise<Product> => {
    try {
        const response = await productApi.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw error;
    }
};

export { getProducts, getProductbyCategory, getProductbyId };