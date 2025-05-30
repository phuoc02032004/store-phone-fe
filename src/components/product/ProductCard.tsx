import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner"
import type { Product } from "@/types/Product";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

    const handleAddToCart = () => {
         toast(`Open ${product.name}`);    
    };

    return(
        <Card className="w-full max-w-sm rounded-xl overflow-hidden shadow-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white flex flex-col h-[420px]">
            <div className="relative group w-full h-[200px] overflow-hidden">
                <img
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    src={product.image}
                    alt={product.name}
                />
                <div className="absolute inset-0 bg-black opacity-0  transition-opacity duration-300"/>
            </div>
            <CardHeader className="p-4 flex-grow">
                <CardTitle className="text-sm text-white font-bold bg-gray-800 rounded-2xl p-1 hover:text-gray-500 transition-colors duration-300 line-clamp-2">
                    {product.name}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-2 pt-0">
                <p className="text-2xl font-bold text-black">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price || product.variants?.[0]?.price)}
                </p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <button
                    className="w-full bg-black hover:bg-white text-white hover:text-black hover:border-black font-semibold py-2.5 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                    onClick={handleAddToCart}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                    </svg>
                    <span>Buy Now</span>
                </button>
            </CardFooter>
        </Card>
    )
}

export default ProductCard;