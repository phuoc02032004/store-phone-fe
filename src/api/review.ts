import type { Review } from "@/types/Review";
import axiosClient from "./axiosClient";

const getReviews = async () => {
    try {
        const response = await axiosClient.get("/reviews");
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const addReview = async (idProduct: string, review: Review) => {
    try {
        const response = await axiosClient.post(`/products/${idProduct}/reviews`, review);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const getProductReviews = async (idProduct: string) => {
    try {
        const response = await axiosClient.get(`/products/${idProduct}/reviews`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export { getReviews, addReview, getProductReviews };