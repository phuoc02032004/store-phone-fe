import axiosClient from "./axiosClient";
import type { Category } from "@/types/Category";

const getAllCategories = async (): Promise<Category[]> => {
    try {
        const response = await axiosClient.get('/categories')
        return response.data
    } catch (error){
        console.error('Error fetching all categories', error)
        throw error
    }
}

const getCategoryById = async (id: string): Promise<Category | null> => {
    try {
        const response = await axiosClient.get(`/categories/${id}`)
        return response.data
    } catch (error) {
        console.error(`Error fetching category with ID ${id}`, error)
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

export { getAllCategories, getCategoryById, getParents, getChild }