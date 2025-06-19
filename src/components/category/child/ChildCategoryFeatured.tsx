import React from 'react';
import type { Product } from '@/types/Product';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/product/ProductCard';

interface ChildCategoryFeaturedProps {
  products: Product[];
}

const ChildCategoryFeatured: React.FC<ChildCategoryFeaturedProps> = ({ products }) => {
  return (
    <section className="bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-8">Featured Products</h2>
        
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {products.slice(0, 6).map((product) => (
              <CarouselItem
                key={product._id}
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8 space-x-4">
            <CarouselPrevious className="static bg-white/10 hover:bg-white/20 text-white" />
            <CarouselNext className="static bg-white/10 hover:bg-white/20 text-white" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default ChildCategoryFeatured;
