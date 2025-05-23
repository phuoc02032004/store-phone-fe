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
        return <div className="text-center text-white">Loading products...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <main className="flex flex-col items-center px-4 py-8 md:px-8 gap-16">
            {/* New Arrival Section */}
            <section className="w-full max-w-[1400px]">
                <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white text-center mb-6">
                    New Arrival
                </h2>
                {productNew.length > 0 ? (
                    <ProductCarousel products={productNew} />
                ) : (
                    <p className="text-center text-white">No new arrival products found.</p>
                )}
            </section>

            {/* Best Seller Section */}
            <section className="w-full max-w-[1400px]">
                <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white text-center mb-6">
                    Best Seller
                </h2>
                {productBest.length > 0 ? (
                    <ProductCarousel products={productBest} />
                ) : (
                    <p className="text-center text-white">No best seller products found.</p>
                )}
            </section>
        </main>
    );
};

export default ProductSection;
