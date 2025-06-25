import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import type { Product } from '@/types/Product';

interface ProductInfoProps {
  product: Product;
  quantity: number;
  handleQuantityChange: (value: number) => void;
  handleAddToCart: (selectedVariant?: Product['variants'][0]) => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, quantity, handleQuantityChange, handleAddToCart }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const [currentVariant, setCurrentVariant] = useState<Product['variants'][0] | null>(null);

  useEffect(() => {
    if (product.variants && product.variants.length > 0) {
      if (!selectedColor) {
        setSelectedColor(product.variants[0].color);
      }
      if (!selectedCapacity) {
        const initialCapacity = product.variants.find(v => v.color === (selectedColor || product.variants[0].color))?.capacity;
        setSelectedCapacity(initialCapacity || product.variants[0].capacity);
      }
    }
  }, [product.variants, selectedColor, selectedCapacity]);

  useEffect(() => {
    if (selectedColor && selectedCapacity && product.variants) {
      const variant = product.variants.find(
        v => v.color === selectedColor && v.capacity === selectedCapacity
      );
      setCurrentVariant(variant || null);
    } else if (product.variants && product.variants.length > 0 && !product.price) {
      setCurrentVariant(product.variants[0]);
    } else {
      setCurrentVariant(null);
    }
  }, [selectedColor, selectedCapacity, product.variants, product.price]);

  const availableColors = product.variants ? [...new Set(product.variants.map(v => v.color))] : [];
  const availableCapacities = product.variants
    ? [...new Set(product.variants.filter(v => v.color === selectedColor).map(v => v.capacity))]
    : [];

  const displayPrice = currentVariant ? currentVariant.price : product.price;
  const displayStock = currentVariant ? currentVariant.stock : product.stock;

  const { theme } = useTheme();

  return (
    <div className={`space-y-6 sm:m-6 shadow-2xl p-4 sm:p-6 md:p-10 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
          <div className={`text-3xl sm:text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(displayPrice || 0)}
          </div>
          <Badge variant="secondary" className={`${displayStock && displayStock > 0 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'} px-3 py-1 rounded-full text-sm font-medium`}>
            {displayStock && displayStock > 0 ? `${displayStock} in stock` : 'Out of Stock'}
          </Badge>
        </div>
 
        <div className={`flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          <div className="flex items-center">
            <span className="mr-1 text-yellow-500">★</span>
            4.8 (120 reviews)
          </div>
          <div>SKU: {product._id}</div>
        </div>
      </div>
 
      <Separator className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} my-6`} />
 
      {availableColors.length > 0 && (
        <div className="space-y-2">
          <span className={`font-medium text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Color:</span>
          <div className="flex flex-wrap gap-2 justify-center">
            {availableColors.map(color => (
              <Button
                key={color}
                variant={selectedColor === color ? "default" : "outline"}
                onClick={() => {
                  setSelectedColor(color);
                  const firstCapacityForColor = product.variants?.find(v => v.color === color)?.capacity;
                  setSelectedCapacity(firstCapacityForColor || null);
                }}
                className={selectedColor === color ? "bg-black text-white dark:bg-white dark:text-black" : "bg-white text-lightText border-black dark:bg-gray-700 dark:text-white dark:border-gray-600"}
              >
                {color}
              </Button>
            ))}
          </div>
        </div>
      )}
 
      {selectedColor && availableCapacities.length > 0 && (
        <div className="space-y-2">
          <span className={`font-medium text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Capacity:</span>
          <div className="flex flex-wrap gap-2 justify-center">
            {availableCapacities.map(capacity => (
              <Button
                key={capacity}
                variant={selectedCapacity === capacity ? "default" : "outline"}
                onClick={() => setSelectedCapacity(capacity)}
                className={selectedCapacity === capacity ? "bg-black text-white dark:bg-white dark:text-black" : "bg-white text-lightText border-black dark:bg-gray-700 dark:text-white dark:border-gray-600"}
              >
                {capacity}
              </Button>
            ))}
          </div>
        </div>
      )}
 
      <Tabs defaultValue="description" className="w-full ">
        <TabsList className={`grid w-full grid-cols-2 rounded-lg  ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <TabsTrigger value="description" className={`rounded-md py-1 ${theme === 'dark' ? 'text-gray-300 data-[state=active]:bg-gray-600 data-[state=active]:text-white' : 'text-gray-700 data-[state=active]:bg-white data-[state=active]:text-gray-900'} data-[state=active]:shadow-sm`}>
            Description
          </TabsTrigger>
          <TabsTrigger value="specifications" className={`rounded-md py-1 ${theme === 'dark' ? 'text-gray-300 data-[state=active]:bg-gray-600 data-[state=active]:text-white' : 'text-gray-700 data-[state=active]:bg-white data-[state=active]:text-gray-900'} data-[state=active]:shadow-sm`}>
            Specifications
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description" className={`mt-6 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          <p>{product.description}</p>
        </TabsContent>
        <TabsContent value="specifications" className="mt-6">
          <div className={`grid grid-cols-1 gap-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            {Object.entries(product.specifications ?? {}).map(([key, value]) => (
              <div key={key} className={`flex items-center justify-between py-2 border-b ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'} last:border-0`}>
                <span className={`font-medium capitalize ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{key}:</span>
                <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{value}</span>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
 
      <Separator className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />
 
      {/* Quantity Selector */}
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <span className={`font-medium text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Quantity:</span>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            className={`bg-transparent border-2 ${theme === 'dark' ? 'border-gray-600 text-white' : 'border-gray-500'}`}
          >
            -
          </Button>
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => handleQuantityChange(Number(e.target.value))}
            className={`w-20 text-center bg-transparent ${theme === 'dark' ? 'text-white border-gray-600' : ''}`}
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(quantity + 1)}
            className={`bg-transparent border-2 ${theme === 'dark' ? 'border-gray-600 text-white' : 'border-gray-500'}`}

          >
            +
          </Button>
        </div>
      </div>
 
      <Button
        className={`w-full font-bold py-2 px-4 rounded ${theme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-black hover:bg-white hover:text-lightText hover:border-black text-white'}`}
        size="lg"
        onClick={() => handleAddToCart(currentVariant || undefined)}
        disabled={!currentVariant || (displayStock !== undefined && displayStock <= 0)}
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductInfo;