import React from "react";
import { useDispatch } from 'react-redux';
import { addItem } from '@/store/cartSlice';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Product } from "@/types/Product";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        if(!localStorage.getItem('token')){
            alert('Ban can dang nhap')
        } else {
            dispatch(addItem({ product, quantity: 1 }));
            console.log(`Added ${product.name} to cart`);
        }
       
    };

    return(
        <Card className="w-full max-w-sm rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
            <div className="relative group w-full"> 
                <img
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105" 
                    src={product.image} 
                    alt={product.name}
                /> 
                <div className="absolute inset-0 bg-black opacity-0  transition-opacity duration-300"/>
            </div>
            <CardHeader className="p-4">
                <CardTitle className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300">
                    {product.name}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <p className="text-2xl font-semibold text-blue-600">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                </p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                    onClick={handleAddToCart} 
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                    </svg>
                    <span>Add to Cart</span>
                </button>
            </CardFooter>
        </Card>
    )
}

export default ProductCard;