import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product/ProductCard";
import { getProductbyCategory } from "@/api/product";
import type { Product } from "@/types/Product";

interface CategoryExploreLineupSectionProps {
  explore_lineup: {
    title: string;
    compareLinkText?: string;
    compareLinkHref?: string;
  };
  category_id: string
}

const CategoryExploreLineupSection: React.FC<CategoryExploreLineupSectionProps> = ({ explore_lineup, category_id }) => {
  const [activeTab, setActiveTab] = useState<string>('');
  const [groupedProducts, setGroupedProducts] = useState<Record<string, { categoryName: string; products: Product[] }>>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [tabs, setTabs] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductsData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getProductbyCategory(category_id);
        if (response && response.groupedProducts) {
          setGroupedProducts(response.groupedProducts);
          const firstCategoryKey = Object.keys(response.groupedProducts)[0];
          if (firstCategoryKey) {
            setActiveTab(response.groupedProducts[firstCategoryKey].categoryName);
            setProducts(response.groupedProducts[firstCategoryKey].products);
          }
          setTabs(Object.values(response.groupedProducts).map(group => group.categoryName));
        } else {
          setProducts([]);
          setTabs([]);
        }
      } catch (err) {
        console.error("Failed to fetch products by category:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductsData();
  }, [category_id]);

  useEffect(() => {
    if (activeTab && groupedProducts) {
      const categoryKey = Object.keys(groupedProducts).find(key => groupedProducts[key].categoryName === activeTab);
      if (categoryKey) {
        setProducts(groupedProducts[categoryKey].products);
      } else {
        setProducts([]);
      }
    }
  }, [activeTab, groupedProducts]);

  return (
    <section className="bg-[#f5f5f7] py-12 md:py-16 text-[#1d1d1f]">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-baseline mb-8 md:mb-10">
          <h2 className="text-[32px] md:text-[40px] font-bold">
            {explore_lineup.title}
          </h2>
          <div className="hidden sm:flex items-center space-x-5 text-[13px] text-[#0071e3] font-normal">
            <a href="#" className="hover:underline">Help me choose ›</a>
            {explore_lineup.compareLinkText && explore_lineup.compareLinkHref && (
                <a href={explore_lineup.compareLinkHref} className="hover:underline">
                    {explore_lineup.compareLinkText} ›
                </a>
            )}
          </div>
        </div>

        <div className="mb-8 md:mb-12">
          <div className="flex space-x-1 bg-neutral-200/70 p-[3px] rounded-full w-max">
            {tabs.map((tabName) => (
              <button
                key={tabName}
                onClick={() => setActiveTab(tabName)}
                className={`px-4 py-[5px] rounded-full text-[13px] font-normal transition-all duration-200 ease-in-out
                  ${activeTab === tabName
                    ? 'bg-white text-black shadow-sm'
                    : 'text-white/40 hover:bg-neutral-300/60 '
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
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10">No products available for this category yet.</p>
        )}
        
        {products.length > 0 && <hr className="mt-12 md:mt-16 border-neutral-300/80" />}

      </div>
    </section>
  );
};

export default CategoryExploreLineupSection;
