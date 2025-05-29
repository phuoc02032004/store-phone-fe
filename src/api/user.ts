import axiosClient from "./axiosClient";

const updateFCMToken = async (fcmToken: string) => {
    try {
        const response = await axiosClient.patch("/users/fcm-token", { fcmToken });
        return response.data;
    } catch (error) {
        console.error("Failed to update FCM token:", error);
        throw new Error("Failed to update FCM token");
    }
};

export { updateFCMToken };