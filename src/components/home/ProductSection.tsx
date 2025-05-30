import React, { useEffect, useState } from "react";
import ProductCarousel from "../carousel/ProductCarousel";
import { getProducts } from "@/api/product";
import type { Product } from "@/types/Product";

const ProductSection: React.FC = () => {
    const [productBest, setProductBest ] = useState<Product[]>([]);
    const [productNew, setProductNew] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const newArrivals = await getProducts({ isNewArrival: true });
                const bestSellers = await getProducts({ isBestSeller: true });
                setProductNew(newArrivals);
                setProductBest(bestSellers);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to fetch products.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="text-center text-white py-10">Loading products...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 py-10">{error}</div>;
    }

    return (
        <div className="flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-8 lg:py-12 gap-8 md:gap-12 lg:gap-16 w-full mx-auto">
            <section className="w-full">
                <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white text-center mb-4 md:mb-6 lg:mb-8 bg-black/50 p-5 rounded-2xl">
                    New Arrival
                </h2>
                {productNew.length > 0 ? (
                    <ProductCarousel products={productNew} />
                ) : (
                    <p className="text-center text-white py-4">No new arrival products found.</p>
                )}
            </section>

            <section className="w-full">
                <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white text-center mb-4 md:mb-6 lg:mb-8 bg-black/50 p-5 rounded-2xl">
                    Best Seller
                </h2>
                {productBest.length > 0 ? (
                    <ProductCarousel products={productBest} />
                ) : (
                    <p className="text-center text-white py-4">No best seller products found.</p>
                )}
            </section>
        </div>
    );
};

export default ProductSection;