import type { ZaloPay } from "@/types/Zalopay";
import axiosClient from "./axiosClient";

const createZaloPay = async (id: string): Promise<ZaloPay> => {
    try{
        const response = await axiosClient.post(`/zaloPay/create/${id}`)
        return response.data;
    } catch(error){
        console.error('Error create Zalo Pay QR', error)
        throw error
    }
}

export {createZaloPay};