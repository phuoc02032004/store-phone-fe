import type { Category } from "./Category";
import type { Feedback } from "./Feedback";

export interface ProductSpecifications {
    display?: string;
    chip?: string;
    camera?: string;
    storage?: string;
    [key: string]: string | undefined;
}

export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: Category[];
    image?: string;
    images?: string[];
    specifications?: ProductSpecifications;
    stock: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
    feedback?: Feedback[];
    isNewArrival?: boolean;
    isBestSeller?: boolean;
}

