import React from "react";

interface Product {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  linkText?: string;
  linkHref?: string;
}

interface CategoryEssentialsSectionProps {
  essentials: {
    title: string; 
    linkText?: string; 
    linkHref?: string;
    products: Product[];
  };
}

const CategoryEssentialsSection: React.FC<CategoryEssentialsSectionProps> = ({ essentials }) => {
  return (
    <section className="bg-white py-12 md:py-16 text-lightText">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {essentials.title}
          </h2>
          {essentials.linkText && essentials.linkHref && (
            <a
              href={essentials.linkHref}
              className="text-sm !text-lightText hover:text-blue-700 font-medium"
            >
              {essentials.linkText} <span aria-hidden="true">›</span>
            </a>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {essentials.products.map((product: Product, index: number) => (
            <div
              key={index}
              className="flex flex-col bg-neutral-50/70 p-8 pt-10 md:p-10 md:pt-12 rounded-2xl h-full" 
            >
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-semibold text-lightText">
                  {product.title}
                </h3>
                <p className="mt-2 text-sm md:text-base text-gray-700 max-w-md mx-auto">
                  {product.description}
                </p>
                {product.linkText && product.linkHref && (
                  <a
                    href={product.linkHref}
                    className="mt-3 inline-block text-sm !text-lightText hover:text-blue-700 font-medium"
                  >
                    {product.linkText} <span aria-hidden="true">›</span>
                  </a>
                )}
              </div>
              <div className="mt-auto pt-8 md:pt-10 flex-grow flex justify-center items-center">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="max-w-full h-auto object-contain max-h-[200px] sm:max-h-[250px] md:max-h-[280px]" 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryEssentialsSection;