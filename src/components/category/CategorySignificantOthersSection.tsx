import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; 

interface Product {
  imageSrc: string;
  imageAlt: string;
  title: string; 
  description: string;
}

interface CategorySignificantOthersSectionProps {
  significant_others: {
    title: string;
    products: Product[];
  };
}

const CategorySignificantOthersSection: React.FC<CategorySignificantOthersSectionProps> = ({
  significant_others,
}) => {
  const [activeProduct, setActiveProduct] = useState<Product | null>(
    significant_others.products.length > 0 ? significant_others.products[0] : null
  );

  const defaultAccordionValue = significant_others.products.length > 0
    ? significant_others.products[0].title
    : undefined;

  const handleAccordionChange = (value: string) => {
    const newActiveProduct = significant_others.products.find(p => p.title === value);
    if (newActiveProduct) {
      setActiveProduct(newActiveProduct);
    } else if (!value && significant_others.products.length > 0) {
    }
  };

  useEffect(() => {
    if (!activeProduct && significant_others.products.length > 0) {
      setActiveProduct(significant_others.products[0]);
    }
  }, [significant_others.products, activeProduct]);


  if (!significant_others || significant_others.products.length === 0) {
    return null; 
  }

  return (
    <section className="bg-white py-12 md:py-16 text-lightText">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-10 md:mb-12">
          {significant_others.title}
        </h2>

        <div className="bg-neutral-50 rounded-2xl p-6 md:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="lg:pr-4">
              <Accordion
                type="single"
                collapsible 
                defaultValue={defaultAccordionValue}
                onValueChange={handleAccordionChange}
                className="w-full"
              >
                {significant_others.products.map((product) => (
                  <AccordionItem key={product.title} value={product.title} className="border-b border-gray-200 last:border-b-0">
                    <AccordionTrigger className="py-5 text-left text-lg font-semibold text-white hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md !bg-lightText/80">
                      {product.title}
                    </AccordionTrigger>
                    <AccordionContent className="pt-1 pb-5 text-sm text-gray-600 leading-relaxed">
                      {product.description}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="flex items-center justify-center lg:pl-4 min-h-[300px] md:min-h-[400px]">
              {activeProduct && (
                <img
                  src={activeProduct.imageSrc}
                  alt={activeProduct.imageAlt}
                  className="w-full h-auto max-w-lg md:max-w-xl object-contain rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySignificantOthersSection;