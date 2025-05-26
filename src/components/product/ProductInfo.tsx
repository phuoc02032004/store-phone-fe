import React from 'react';
import {
  CardContent,
} from "@/components/ui/card";
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
  handleAddToCart: () => void; 
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, quantity, handleQuantityChange, handleAddToCart }) => {
  return (
    <div className="space-y-6 m-6 shadow-2xl p-10">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-4xl font-bold text-gray-900">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
          </div>
          <Badge variant="secondary" className={`${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} px-3 py-1 rounded-full text-sm font-medium`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
          </Badge>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <span className="mr-1 text-yellow-500">★</span>
            4.8 (120 reviews)
          </div>
          <div>SKU: {product._id}</div>
        </div>
      </div>

      <Separator className="my-6" />

      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-2 rounded-lg bg-gray-100 p-1">
          <TabsTrigger value="description" className="rounded-md py-2 text-gray-700 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm">
            Description
          </TabsTrigger>
          <TabsTrigger value="specifications" className="rounded-md py-2 text-gray-700 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm">
            Specifications
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-6 text-gray-700 leading-relaxed">
          <p>{product.description}</p>
        </TabsContent>
        <TabsContent value="specifications" className="mt-6">
          <div className="grid grid-cols-1 gap-4 bg-gray-50 p-4 rounded-lg">
            {Object.entries(product.specifications ?? {}).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                <span className="font-medium capitalize text-gray-700">{key}:</span>
                <span className="text-gray-600">{value}</span>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Separator />

      {/* Quantity Selector */}
      <div className="flex items-center space-x-4">
        <span className="font-medium text-gray-700">Quantity:</span>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            className='bg-transparent border-2 border-gray-500'
          >
            -
          </Button>
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => handleQuantityChange(Number(e.target.value))}
            className="w-20 text-center bg-transparent"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(quantity + 1)}
            className='bg-transparent border-2 border-gray-500'

          >
            +
          </Button>
        </div>
      </div>

      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" size="lg" onClick={handleAddToCart}>
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductInfo;