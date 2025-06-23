import React from "react";
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

    return(
        <Card className="w-full max-w-sm rounded-2xl overflow-hidden group
            bg-lightBg border border-gray-200 shadow-md
            hover:shadow-lg hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.01]">
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
                <CardTitle className="text-xl font-semibold text-lightText mb-2 truncate">
                    {product.name}
                </CardTitle>
                <p className="text-lightText text-sm mb-4 line-clamp-2">
                    {product.description}
                </p>
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        {product.variants?.length > 0 ? (
                            <>
                                <p className="text-lg font-bold text-lightText">
                                    From {new Intl.NumberFormat(CURRENCY_LOCALE, { style: 'currency', currency: CURRENCY_CODE }).format(Math.min(...product.variants.map(v => v.price)))}
                                </p>
                                {Math.min(...product.variants.map(v => v.price)) < product.price && (
                                    <p className="text-sm text-gray-600 line-through">
                                        {new Intl.NumberFormat(CURRENCY_LOCALE, { style: 'currency', currency: CURRENCY_CODE }).format(product.price)}
                                    </p>
                                )}
                            </>
                        ) : (
                            <p className="text-lg font-bold text-lightText">
                                {new Intl.NumberFormat(CURRENCY_LOCALE, { style: 'currency', currency: CURRENCY_CODE }).format(product.price)}
                            </p>
                        )}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        className="bg-gray-100 hover:bg-buttonOutlineHoverBg !text-lightText border-buttonOutlineBorder"
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