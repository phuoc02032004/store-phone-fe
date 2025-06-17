import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Product {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  linkText?: string; 
  linkHref?: string;
}

interface CategoryWhyBuySectionProps {
  why_buy: {
    title: string;
    linkText?: string;
    linkHref?: string;
    products: Product[];
  };
}

const CategoryWhyBuySection: React.FC<CategoryWhyBuySectionProps> = ({ why_buy }) => {
  return (
    <section className="bg-gray-50 py-12 md:py-16 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-start mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 max-w-2xl">
            {why_buy.title}
          </h2>
          {why_buy.linkText && why_buy.linkHref && (
            <div className="mt-1 sm:mt-0 flex-shrink-0 ml-4">
              <a
                href={why_buy.linkHref}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {why_buy.linkText} <span aria-hidden="true">›</span>
              </a>
            </div>
          )}
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: why_buy.products.length > 4, 
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {why_buy.products.map((product: Product, index: number) => (
              <CarouselItem
                key={index}
                className="pl-4 md:pl-6 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4" 
              >
                <div className="flex flex-col text-left bg-white p-6 rounded-xl h-full relative shadow-sm">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="w-9 h-9 object-contain mb-5" 
                  />
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                    {product.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 flex-grow">
                    {product.description}
                  </p>
                  {product.linkHref && ( 
                    <div className="absolute bottom-5 right-5 md:bottom-6 md:right-6">
                      <a
                        href={product.linkHref}
                        aria-label={`Learn more about ${product.title}`}
                        className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-neutral-700 text-white text-lg md:text-xl hover:bg-neutral-600 transition-colors"
                      >
                        +
                      </a>
                    </div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {why_buy.products.length > 1 && ( 
            <div className="flex justify-center items-center mt-8 md:mt-10 space-x-3">
              <CarouselPrevious 
                className="static flex items-center justify-center h-9 w-9 rounded-md bg-gray-200/80 hover:bg-gray-300/90 text-gray-700 disabled:opacity-50 disabled:pointer-events-none transition-colors"
              />
              <CarouselNext
                className="static flex items-center justify-center h-9 w-9 rounded-md bg-gray-200/80 hover:bg-gray-300/90 text-gray-700 disabled:opacity-50 disabled:pointer-events-none transition-colors"
              />
            </div>
          )}
        </Carousel>
      </div>
    </section>
  );
};

export default CategoryWhyBuySection;