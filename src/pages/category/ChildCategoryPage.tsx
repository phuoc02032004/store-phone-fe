import React, { useEffect, useState } from "react";
import { useTheme } from '@/context/ThemeContext';
import { useParams } from "react-router-dom";
import { getProductbyCategory } from "@/api/product";
import { getCategoryById } from "@/api/category";
import type { Product } from "@/types/Product";
import type { Category } from "@/types/Category";
import ChildCategoryFilteredList from "@/components/category/child/ChildCategoryFilteredList";
import ChildCategoryHeroSection from "@/components/category/child/ChildCategoryHeroSection";
import ProductSection from "@/components/home/ProductSection";

const ChildCategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPageData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [productsResponse, categoryResponse] = await Promise.all([
          getProductbyCategory(categoryId ?? ''),
          getCategoryById(categoryId ?? '')
        ]);

        if (productsResponse && productsResponse.groupedProducts) {
          const firstCategoryKey = Object.keys(productsResponse.groupedProducts)[0];
          if (firstCategoryKey) {
            setProducts(productsResponse.groupedProducts[firstCategoryKey].products);
          } else {
            setProducts([]);
          }
        } else {
          setProducts([]);
        }
        setCategory(categoryResponse);
      } catch (err) {
        console.error('Error loading page data:', err);
        setError("Failed to load page data");
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      loadPageData();
    }
  }, [categoryId]);

  const { theme } = useTheme();

  if (!categoryId) {
    return (
      <div className={`min-h-screen pt-16 flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
        <p className="text-lg">No category ID provided in the URL.</p>
      </div>
    );
  }
 
  if (loading) {
    return (
      <div className={`min-h-screen pt-16 flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <h1 className="text-3xl font-bold mb-4">Loading...</h1>
      </div>
    );
  }
 
  if (error) {
    return (
      <div className={`min-h-screen pt-16 flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <h1 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-red-400' : 'text-red-500'}`}>Error</h1>
        <p className={`text-lg ${theme === 'dark' ? 'text-red-300' : 'text-red-400'}`}>{error}</p>
      </div>
    );
  }
 
  if (!category) {
    return (
      <div className={`min-h-screen pt-16 flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
      </div>
    );
  }
 
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <ChildCategoryHeroSection categoryName={category.name} />
 
      <ChildCategoryFilteredList
        products={products}
        categoryName={category.name}
      />
      <ProductSection />
    </div>
  );
};

export default ChildCategoryPage;