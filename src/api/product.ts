import type { Product } from '@/types/Product'
import axiosClient from "./axiosClient";

const getProducts = async (params?: { isNewArrival?: boolean; isBestSeller?: boolean }): Promise<Product[]> => {
    try {
        const response = await axiosClient.get('/products', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

const getProductbyCategory = async (category: string): Promise<Product[]> => {
    try {
        const response = await axiosClient.get(`/products/category/${category}`)
        return response.data
        } catch (error) {
        console.error('Error fetching products:', error)
        throw error
    }
};

const getProductbyId = async (id: string): Promise<Product> => {
    try {
        const response = await axiosClient.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw error;
    }
};

const searchProducts = async (query: string): Promise<Product[]> => {
    try {
        const response = await axiosClient.get('/products/search', { params: { q: query } });
        return response.data;
    } catch (error) {
        console.error('Error searching products:', error);
        throw error;
    }
}

export { getProducts, getProductbyCategory, getProductbyId, searchProducts };