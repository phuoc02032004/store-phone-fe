import axiosClient from "./axiosClient";
import type { Category } from "@/types/Category";

const getCategory = async (): Promise<Category[]> => {
    try {
        const response = await axiosClient.get('/categories')
        return response.data
    } catch (error){
        console.error('Error', error)
        throw error
    }
}

const getParents = async (): Promise<Category[]> => {
    try{
        const response = await axiosClient.get('/categories/parents')
        return response.data
    } catch (error){
        console.error('Error', error)
        throw error
    }
}

const getChild = async (id: string): Promise<Category[]> => {
    try {
        const response =  await axiosClient.get(`/categories/${id}/children`)
        return response.data
    } catch ( error){
        console.error('Error get Child', error)
        throw error;
    }
}

export { getCategory, getParents, getChild }