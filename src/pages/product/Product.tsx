import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTheme } from '@/context/ThemeContext';
import { getProductbyId } from '@/api/product';
import type { Product } from '@/types/Product';
import type { Review } from '@/types/Review';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ReviewList from '@/components/product/reviews/ReviewList';
import ReviewForm from '@/components/product/reviews/ReviewForm';
import { getProductReviews } from '@/api/review';
import { toast } from "sonner"
import { addItem } from '@/store/cartSlice';

const Products: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState<string | null>(null);

  const fetchProduct = async () => {
      if (!id) {
        setError("Product ID is missing.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const productData = await getProductbyId(id);
        setProduct(productData);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

  const fetchReviews = async () => {
    if (!id) {
      setReviewsError("Product ID is missing for reviews.");
      setReviewsLoading(false);
      return;
    }
    try {
      setReviewsLoading(true);
      const reviewsData = await getProductReviews(id);
      setReviews(reviewsData);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setReviewsError("Failed to load reviews.");
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, []);

  const handleQuantityChange = (value: number) => {
    if (value >= 1) setQuantity(value);
  };

  const handleAddToCart = (selectedVariant?: Product['variants'][0]) => {
    if(!localStorage.getItem('token')){
      toast('Login pls')
    }else{
        if (product) {
        dispatch(addItem({ product, quantity, selectedVariant }));
        toast(`Added ${quantity} of ${product.name} to cart`)
      }
    }

  };

  if (loading) {
    return <div className="text-center py-8">Loading product details...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-center py-8">Product not found.</div>;
  }
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-background text-foreground'}`}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className={`text-3xl md:text-4xl font-bold mb-8 text-center ${theme === 'dark' ? 'text-white' : 'text-foreground'}`}>{product.name}</h1>
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-6 rounded-lg shadow-sm ${theme === 'dark' ? 'bg-gray-800' : 'bg-card'}`}>
          <div className="flex justify-center items-center">
            <ProductImageGallery productName={product.name} image={Array.isArray(product.image) ? product.image.filter((img): img is string => !!img) : [product.image].filter((img): img is string => !!img)} />
          </div>
          <div className="space-y-6">
            <ProductInfo
              product={product}
              quantity={quantity}
              handleQuantityChange={handleQuantityChange}
              handleAddToCart={handleAddToCart}
            />
          </div>
        </div>
 
        <div className={`mt-12 md:mt-16 p-6 rounded-lg shadow-sm ${theme === 'dark' ? 'bg-gray-800' : 'bg-card'}`}>
          {reviewsLoading ? (
            <div className={`text-center py-4 ${theme === 'dark' ? 'text-gray-400' : 'text-muted-foreground'}`}>Loading reviews...</div>
          ) : reviewsError ? (
            <div className={`text-center py-4 ${theme === 'dark' ? 'text-red-400' : 'text-destructive'}`}>{reviewsError}</div>
          ) : (
            <ReviewList reviews={reviews || []} />
          )}
          <ReviewForm productId={product._id} onReviewSubmit={fetchReviews} />
        </div>
      </div>
    </div>
  );
};

export default Products;