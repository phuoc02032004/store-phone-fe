import React from "react";

interface ProductNavItem {
  imageSrc: string;
  imageAlt: string;
  text: string;
  linkHref: string;
  label?: string; 
}

interface CategoryProductNavSectionProps {
  products: ProductNavItem[];
}

const CategoryProductNavSection: React.FC<CategoryProductNavSectionProps> = ({ products }) => {
  return (
    <section className="py-4 px-4 bg-gray-100 text-black overflow-x-auto flex">
      <div className="flex space-x-8 max-w-7xl mx-auto">
        {products.map((product, index) => (
          <a key={index} href={product.linkHref} className="flex flex-col items-center text-center flex-shrink-0">
            <img src={product.imageSrc} alt={product.imageAlt} className="w-12 h-12 object-contain mb-1" />
            <div className="flex items-center">
              <span className="text-sm font-semibold">{product.text}</span>
              {product.label && (
                <span className="ml-1 text-xs font-bold text-orange-700">{product.label}</span>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default CategoryProductNavSection;