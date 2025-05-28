import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductbyCategory } from '../api/product'; 
import { getCategory } from '../api/category'; 
import type { Product } from '../types/Product'; 
import type { Category } from '../types/Category'; 
import ProductCard from '../components/product/ProductCard';
import { Separator } from '../components/ui/separator';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

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
  const [sortOrder, setSortOrder] = useState<string>('default');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

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

  useEffect(() => {
    fetchData();
  }, [categoryId, sortOrder]);

  useEffect(() => {
    applyPriceFilter();
  }, [products, sortOrder]); 
  
  
  const applyPriceFilter = () => {
    let currentProducts = [...products];

    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);

    currentProducts = currentProducts.filter(product => {
      const productPrice = product.variants?.[0]?.price || 0;
      if (!isNaN(min) && productPrice < min) {
        return false;
      }
      if (!isNaN(max) && productPrice > max) {
        return false;
      }
      return true;
    });

    currentProducts.sort((a, b) => {
      const priceA = a.variants?.[0]?.price || 0;
      const priceB = b.variants?.[0]?.price || 0;

      if (sortOrder === 'price-asc') {
        return priceA - priceB;
      } else if (sortOrder === 'price-desc') {
        return priceB - priceA;
      }
      return 0;
    });

    setFilteredProducts(currentProducts);
  };

  const handleFilterButtonClick = () => {
    applyPriceFilter();
  };

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
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 min-h-screen text-white">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-400">{category.name}</h1>

      <div className="bg-gray-800 p-6 rounded-xl shadow-2xl mb-10 border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          <div className="md:col-span-1">
            <Label htmlFor="sort-order" className="text-gray-300 mb-2 block text-sm font-medium">Sort by</Label>
            <Select onValueChange={setSortOrder} value={sortOrder}>
              <SelectTrigger id="sort-order" className="w-full bg-gray-700 text-white border-gray-600 focus:border-blue-500 transition-all duration-200 hover:border-blue-400">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 text-white border-gray-600 shadow-lg">
                <SelectItem value="default" className="hover:bg-gray-600 focus:bg-gray-600">Default</SelectItem>
                <SelectItem value="price-asc" className="hover:bg-gray-600 focus:bg-gray-600">Price: Low to High</SelectItem>
                <SelectItem value="price-desc" className="hover:bg-gray-600 focus:bg-gray-600">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-1">
            <Label htmlFor="min-price" className="text-gray-300 mb-2 block text-sm font-medium">Min Price</Label>
            <Input
              id="min-price"
              type="number"
              placeholder="e.g., 50"
              value={minPrice}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^\d*\.?\d*$/.test(value)) {
                  setMinPrice(value);
                }
              }}
              className="w-full bg-gray-700 text-white border-gray-600 focus:border-blue-500 placeholder-gray-400 transition-all duration-200 hover:border-blue-400"
            />
          </div>
          <div className="md:col-span-1">
            <Label htmlFor="max-price" className="text-gray-300 mb-2 block text-sm font-medium">Max Price</Label>
            <Input
              id="max-price"
              type="number"
              placeholder="e.g., 500"
              value={maxPrice}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^\d*\.?\d*$/.test(value)) {
                  setMaxPrice(value);
                }
              }}
              className="w-full bg-gray-700 text-white border-gray-600 focus:border-blue-500 placeholder-gray-400 transition-all duration-200 hover:border-blue-400"
            />
          </div>
          <div className="md:col-span-1">
            <Button
              onClick={handleFilterButtonClick}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>

      <Separator className="my-10 bg-gray-700" />

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {filteredProducts.map(product => (
              <Link key={product._id} to={`/product/${product._id}`} className="block transform hover:scale-105 transition-transform duration-200 ease-in-out">
                <ProductCard product={product} />
              </Link>
            ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 text-xl py-10">No products found in this category matching your criteria.</div>
      )}

      <Separator className="my-10 bg-gray-700" />

      <h2 className="text-3xl font-bold mb-6 text-blue-400 text-center">Explore Other Categories</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {
          otherCategories.filter(cat => cat.parent !== null).map(cat => (
            <Button
              key={cat._id}
              variant="outline"
              asChild
              className="bg-gray-700 text-white border-gray-600 hover:bg-white hover:text-black hover:border-blue-600 transition-colors duration-200 px-6 py-3 rounded-lg shadow-md"
            >
              <Link to={`/category/${cat._id}`}>{cat.name}</Link>
            </Button>
          ))
        }
      </div>
    </div>
  );
};

export default CategoryPage;