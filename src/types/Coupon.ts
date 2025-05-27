export type CouponType =
    'PERCENTAGE_DISCOUNT' |  // Giảm theo % trên tổng đơn hoặc sản phẩm
    'FIXED_AMOUNT_DISCOUNT' |  // Giảm số tiền cố định trên tổng đơn hoặc sản phẩm
    'FREE_SHIPPING' | // Miễn phí vận chuyển
    'BUY_X_GET_Y' | // Mua X tặng Y (có thể là sản phẩm hoặc dịch vụ)
    'PRODUCT_GIFT'; // Tặng sản phẩm cụ thể khi mua hàng

export interface Coupon {
    _id: string;
    name: string;
    code: string;
    description: string;
    type: CouponType;
    value: number;
    startDate: Date | string;
    endDate: Date | string;
    isActive: boolean;
    usageLimit: number | null;
    timesUsed: number;
    usageLimitPerUser: number;
    minOrderValue: number;
    maxDiscountValue: number;
    applicableProducts: string[];
    applicableCategories: string[],
    excludedProducts: string[],
    buyQuantity: number;
    getQuantity: number;
    giftProductId:string[],
    createdBy: string[],
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}