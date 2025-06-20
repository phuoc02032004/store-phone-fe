import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product/ProductCard";
import { getProducts } from "@/api/product";
import type { Product } from "@/types/Product";

const ProductSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('New Arrival');
  const [productsData, setProductsData] = useState<Record<string, Product[]>>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [tabs, setTabs] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [displayLimit, setDisplayLimit] = useState<number>(8); 

  useEffect(() => {
    const fetchProductsData = async () => {
      setLoading(true);
      setError(null);
      try {
        const newArrivals = await getProducts({ isNewArrival: true });
        const bestSellers = await getProducts({ isBestSeller: true });

        const fetchedProducts: Record<string, Product[]> = {
          'New Arrival': newArrivals,
          'Best Seller': bestSellers,
        };

        setProductsData(fetchedProducts);
        const availableTabs = Object.keys(fetchedProducts).filter(key => fetchedProducts[key].length > 0);
        setTabs(availableTabs);

        if (availableTabs.length > 0) {
          const initialTab = availableTabs.includes('New Arrival') ? 'New Arrival' : availableTabs[0];
          setActiveTab(initialTab);
          setProducts(fetchedProducts[initialTab]);
          setDisplayLimit(8); 
        } else {
          setProducts([]);
          setDisplayLimit(8);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductsData();
  }, []);

  useEffect(() => {
    if (activeTab && productsData) {
      setProducts(productsData[activeTab] || []);
      setDisplayLimit(8);
    }
  }, [activeTab, productsData]);

  const handleShowMore = () => {
    setDisplayLimit(prevLimit => prevLimit + 8); 
  };

  const handleCollapse = () => {
    setDisplayLimit(prevLimit => Math.max(8, prevLimit - 8));
  };

  return (
    <section className="bg-appleGray py-20 md:py-24 text-appleBlack w-full p-6">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-baseline mb-10 md:mb-14">
          <h2 className="text-[32px] md:text-[40px] font-bold text-primary">
            Explore Our Products
          </h2>
          <div className="hidden sm:flex items-center space-x-5 text-[13px] text-appleBlue font-normal">
            <a href="#" className="hover:underline">Help me choose ›</a>
            <a href="#" className="hover:underline">Compare all models ›</a>
          </div>
        </div>

        <div className="mb-12 md:mb-16">
          <div className="flex space-x-1 bg-gray-100 p-[3px] rounded-full w-max">
            {tabs.map((tabName) => (
              <button
                key={tabName}
                onClick={() => setActiveTab(tabName)}
                className={`px-4 py-[5px] rounded-full text-[13px] font-normal transition-all duration-200 ease-in-out
                  ${activeTab === tabName
                    ? 'bg-white text-black shadow-sm'
                    : 'text-gray-500 hover:bg-gray-300/60'
                  }`}
              >
                {tabName}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading products...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-10">{error}</p>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
            {products.slice(0, displayLimit).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10">No products available yet.</p>
        )}

        {(products.length > displayLimit || displayLimit > 8) && (
          <div className="flex justify-center mt-12 md:mt-16 space-x-4">
            {displayLimit < products.length && (
              <Button
                onClick={handleShowMore}
                className="bg-appleBlue text-white px-8 py-3 rounded-full text-base font-medium hover:bg-appleBlueHover transition-colors duration-200"
              >
                Show More
              </Button>
            )}
            {displayLimit > 8 && (
              <Button
                onClick={handleCollapse}
                className="bg-gray-200 text-gray-800 px-8 py-3 rounded-full text-base font-medium hover:bg-gray-300 transition-colors duration-200"
              >
                Collapse
              </Button>
            )}
          </div>
        )}
        
        {products.length > 0 && <hr className="mt-12 md:mt-16 border-neutral-300/80" />}

      </div>
    </section>
  );
};

export default ProductSection;