import React from 'react';
import type { Product } from '@/types/Product';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/product/ProductCard';

interface ChildCategoryFilteredListProps {
  products: Product[];
  categoryName: string;
}

const ChildCategoryFilteredList: React.FC<ChildCategoryFilteredListProps> = ({
  products,
  categoryName,
}) => {
  const priceRanges = [
    { min: 0, max: 500, label: 'Under $500' },
    { min: 500, max: 1000, label: '$500 - $1000' },
    { min: 1000, max: Infinity, label: 'Over $1000' },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              All {categoryName} Products
            </h2>
            <p className="mt-2 text-gray-600">
              {products.length} products available
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
            {priceRanges.map((range) => (
              <Button
                key={range.label}
                variant="outline"
                size="sm"
                className="text-white hover:bg-gray-100 hover:text-lightText"
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-w-screen">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChildCategoryFilteredList;
