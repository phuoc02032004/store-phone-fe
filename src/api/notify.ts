import axiosClient from "./axiosClient";
import type { Notify } from "@/types/Notify";

const getmyNotifications = async () => {
    try {
        const response = await axiosClient.get<Notify[]>("/notifications/my");
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch notifications");
    }
}

const getNotificationById = async (id: string) => {
    try {
        const response = await axiosClient.get<Notify>(`/notifications/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch notification by ID");
    }
}

const markNotificationAsRead = async (id: string) => {
    try {
        const response = await axiosClient.patch(`/notifications/${id}/read`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to mark notification as read");
    }
}

export { getmyNotifications, getNotificationById, markNotificationAsRead };