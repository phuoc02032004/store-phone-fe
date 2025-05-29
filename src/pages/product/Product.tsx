import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProductbyId } from '@/api/product';
import type { Product } from '@/types/Product';
import type { Review } from '@/types/Review';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ReviewList from '@/components/product/reviews/ReviewList';
import ReviewForm from '@/components/product/reviews/ReviewForm';
import { getProductReviews } from '@/api/review';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
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
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="border-none shadow-md bg-white rounded-xl overflow-hidden">
        <CardHeader className="border-b border-gray-200 p-6">
          <CardTitle className="text-3xl font-bold text-gray-800">{product.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:border-r border-gray-200 md:pr-8 pb-6 md:pb-0">
              <ProductImageGallery productName={product.name} image={Array.isArray(product.image) ? product.image.filter((img): img is string => !!img) : [product.image].filter((img): img is string => !!img)} />
            </div>
            <div className="space-y-8">
              <ProductInfo
                product={product}
                quantity={quantity}
                handleQuantityChange={handleQuantityChange}
                handleAddToCart={handleAddToCart}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {reviewsLoading ? (
        <div className="text-center py-4">Loading reviews...</div>
      ) : reviewsError ? (
        <div className="text-center py-4 text-red-500">{reviewsError}</div>
      ) : (
        <ReviewList reviews={reviews || []} />
      )}
      <ReviewForm productId={product._id} onReviewSubmit={fetchReviews} />
    </div>
  );
};

export default Products;