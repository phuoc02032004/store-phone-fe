import axiosClient from "./axiosClient"

const getCoupons = async () => {
    try {
        const response = await axiosClient.get('/coupons');
        return response.data;
    } catch (error) {
        console.error('Error fetching coupons:', error);
        throw error;
    }
}

const getCouponByCode = async (code: string) => {
    try {
        const response = await axiosClient.get(`/coupons/code/${code}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching coupon by code:', error);
        throw error;
    }
}

const applyCoupon = async (couponCode: string) => {
    try {
        const response = await axiosClient.post('/coupons/apply', { couponCode, totalAmount: 10000000 });
        return response.data;
    } catch (error) {
        console.error('Error applying coupon:', error);
        throw error;
    }
}

export { getCoupons, getCouponByCode, applyCoupon};