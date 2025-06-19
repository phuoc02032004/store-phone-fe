import React from 'react';
import { Button } from '@/components/ui/button';
import { type Product } from '@/types/Product';

interface ChildCategorySpecificationsProps {
  products: Product[];
}

const ChildCategorySpecifications: React.FC<ChildCategorySpecificationsProps> = ({ products }) => {
  // Group products by some key specification or feature
  const groupedProducts = products.reduce((acc, product) => {
    const key = Object.values(product.specifications || {}).find((value): value is string => typeof value === 'string') || 'Other';
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Technical Specifications</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(groupedProducts).map(([spec, products]) => (
            <div key={spec} className="bg-gray-50 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{spec}</h3>
              <div className="space-y-4">
                {products.map((product) => (
                  <div 
                    key={product._id}
                    className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start space-x-4">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{product.name}</h4>
                        <div className="mt-1 space-y-1">
                          {product.specifications && Object.entries(product.specifications).map(([name, value], index) => (
                            <p key={index} className="text-sm text-gray-500">
                              {name}: {value}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-lg font-semibold text-gray-900">
                        ${product.price}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        Compare
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChildCategorySpecifications;
