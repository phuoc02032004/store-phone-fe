import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductbyCategory } from "@/api/product";
import { getCategory } from "@/api/category";
import type { Product } from "@/types/Product";
import type { Category } from "@/types/Category";
import ChildCategoryFeatured from "@/components/category/child/ChildCategoryFeatured";
import ChildCategorySpecifications from "@/components/category/child/ChildCategorySpecifications";
import ChildCategoryFilteredList from "@/components/category/child/ChildCategoryFilteredList";

const ChildCategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products and category data
  useEffect(() => {
    const loadPageData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch products and category info in parallel
        const [productsResponse, categoryResponse] = await Promise.all([
          getProductbyCategory(categoryId ?? ''),
          getCategory(categoryId ?? '')
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
        setCategory(categoryResponse.length > 0 ? categoryResponse[0] : null);
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

  if (!categoryId) {
    return (
      <div className="min-h-screen text-white pt-16 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
        <p className="text-lg">No category ID provided in the URL.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen text-white pt-16 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen text-white pt-16 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4 text-red-500">Error</h1>
        <p className="text-lg text-red-400">{error}</p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen text-white pt-16 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">

      <ChildCategoryFeatured products={products} />

      <ChildCategorySpecifications products={products} />

      <ChildCategoryFilteredList 
        products={products} 
        categoryName={category.name}
      />
    </div>
  );
};

export default ChildCategoryPage;