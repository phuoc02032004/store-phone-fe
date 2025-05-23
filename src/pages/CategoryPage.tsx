import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductbyCategory } from '../api/product'; 
import { getCategory } from '../api/category'; 
import type { Product } from '../types/Product'; 
import type { Category } from '../types/Category'; 
import ProductCard from '../components/product/ProductCard'; 
import { Separator } from '../components/ui/separator';
import { Button } from '../components/ui/button';

interface CategoryPageParams extends Record<string, string | undefined> {
  categoryId: string;
}

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<CategoryPageParams>();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [otherCategories, setOtherCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
    
        const allCategories = await getCategory();
        const currentCategory = allCategories.find((cat: Category) => cat._id === categoryId);
        setCategory(currentCategory || null);

        if (categoryId) {
          const productsData = await getProductbyCategory(categoryId);
          setProducts(productsData);

          const filteredCategories = allCategories.filter((cat: Category) => cat._id !== categoryId);
          setOtherCategories(filteredCategories);
        } else {
           setError("Category ID is missing.");
           setProducts([]);
           setOtherCategories(allCategories); 
        }

      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load category data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!category) {
      return <div>Category not found.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">{category.name}</h1>

      <Separator className="my-8" />

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <Link key={product._id} to={`/product/${product._id}`}> 
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      ) : (
        <div>No products found in this category.</div>
      )}

      <Separator className="my-8" />

      <h2 className="text-2xl font-semibold mb-4 text-white">Other Categories</h2>
      <div className="flex flex-wrap gap-4">
        {otherCategories.map(cat => (
          <Button key={cat._id} variant="outline" asChild>
            <Link to={`/category/${cat._id}`}>{cat.name}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;