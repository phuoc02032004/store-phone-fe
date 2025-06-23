import React from "react";
import { useTheme } from '@/context/ThemeContext';
import { CURRENCY_LOCALE, CURRENCY_CODE } from "@/config/currencyConfig";
import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/Product";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/product/${product._id}`)
    };

    const { theme } = useTheme();

    return(
        <Card className={`w-full max-w-sm rounded-2xl overflow-hidden group
            ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-lightBg border-gray-200'} shadow-md
            hover:shadow-lg ${theme === 'dark' ? 'hover:border-gray-600' : 'hover:border-gray-300'} transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.01]`}>
            {/* Product Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                />
                {product.variants?.some(variant => variant.price < product.price) && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Sale
                    </div>
                )}
            </div>
 
            {/* Product Info */}
            <CardContent className="p-6">
                <CardTitle className={`text-xl font-semibold mb-2 truncate ${theme === 'dark' ? 'text-white' : 'text-lightText'}`}>
                    {product.name}
                </CardTitle>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-lightText'} text-sm mb-4 line-clamp-2`}>
                    {product.description}
                </p>
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        {product.variants?.length > 0 ? (
                            <>
                                <p className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-lightText'}`}>
                                    From {new Intl.NumberFormat(CURRENCY_LOCALE, { style: 'currency', currency: CURRENCY_CODE }).format(Math.min(...product.variants.map(v => v.price)))}
                                </p>
                                {Math.min(...product.variants.map(v => v.price)) < product.price && (
                                    <p className={`text-sm line-through ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {new Intl.NumberFormat(CURRENCY_LOCALE, { style: 'currency', currency: CURRENCY_CODE }).format(product.price)}
                                    </p>
                                )}
                            </>
                        ) : (
                            <p className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-lightText'}`}>
                                {new Intl.NumberFormat(CURRENCY_LOCALE, { style: 'currency', currency: CURRENCY_CODE }).format(product.price)}
                            </p>
                        )}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        className={`${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white border-gray-600' : 'bg-gray-100 hover:bg-buttonOutlineHoverBg !text-lightText border-buttonOutlineBorder'}`}
                        onClick={handleViewDetails}
                    >
                        View Details
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProductCard;