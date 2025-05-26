import type { Order } from "@/types/Order";
import type { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";

const getOrder = async(): Promise<Order[]> => {
    try {
        const response = await axiosClient.get('/');
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
        const response: AxiosResponse<Order> = await axiosClient.post('/orders', payload);
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
}

const myOrder = async () => {
    try{
        const response = await axiosClient.get('/orders/my-orders')
        return response.data
    } catch (error) {
        console.error('Error get order', error)
        throw error
    }
}

const getOrderbyId = async (id: string) => {
    try {
        const response = await axiosClient.get(`/orders/${id}`)
        return response.data
    } catch (error) {
        console.error('Error get order by id', error)
        throw error
    }
} 

export { getOrder, createOrder, myOrder, getOrderbyId };
