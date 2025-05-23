import axios from "axios";
import type { Order } from "@/types/Order";
import type { AxiosResponse } from "axios";

const orderApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

orderApi.interceptors.request.use(
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

const getOrder = async(): Promise<Order[]> => {
    try {
        const response = await orderApi.get('/');
        return response.data
    } catch (error){
        console.error('Error get order', error)
        throw error
    }
}

interface CreateOrderPayload {
    items: { product: string; quantity: number }[];
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        phone: string;
    };
    paymentMethod: string;
    notes?: string;
}

const createOrder = async (payload: CreateOrderPayload): Promise<Order> => {
    try {
        const response: AxiosResponse<Order> = await orderApi.post('/orders', payload);
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
}

const myOrder = async () => {
    try{
        const response = await orderApi.get('/orders/my-orders')
        return response.data
    } catch (error) {
        console.error('Error get order', error)
        throw error
    }
}

const getOrderbyId = async (id: string) => {
    try {
        const response = await orderApi.get(`/orders/${id}`)
        return response.data
    } catch (error) {
        console.error('Error get order by id', error)
        throw error
    }
} 

export { getOrder, createOrder, myOrder, getOrderbyId };
