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
  linkText: string;
  linkHref: string;
}

interface CategoryGetToKnowSectionProps {
  get_to_know: {
    title: string;
    products: Product[];
  };
}

const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
      clipRule="evenodd"
    />
  </svg>
);

const imageBackgroundMap: { [key: string]: { bgColor: string; isLightBackground: boolean } } = {
  "/images/mac_ease.jpg": { bgColor: "#242426", isLightBackground: false },
  "/images/mac_performance.jpg": { bgColor: "#242426", isLightBackground: false },
  "/images/mac_iphone.jpg": { bgColor: "#FAFAFA", isLightBackground: true },
  "/images/mac_compatibility.jpg": { bgColor: "#FAFAFA", isLightBackground: true },
  "/images/mac_security.jpg": { bgColor: "#242426", isLightBackground: false },
  "/images/mac_durability.jpg": { bgColor: "#FAFAFA", isLightBackground: true },
  "/images/mac_values.jpg": { bgColor: "#FAFAFA", isLightBackground: true },
};

const CategoryGetToKnowSection: React.FC<CategoryGetToKnowSectionProps> = ({ get_to_know }) => {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-[54px] font-bold text-[#1d1d1f] leading-[1.108] tracking-[-0.005em] mb-10 md:mb-12">
          {get_to_know.title}
        </h2>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-5">
            {get_to_know.products.map((product: Product, index: number) => (
              <CarouselItem
                key={index}
                className="pl-4 md:pl-5 basis-[80%] sm:basis-[45%] md:basis-[31%] lg:basis-[24%]"
              >
                <div
                  className="relative rounded-[28px] overflow-hidden group h-[480px] md:h-[500px] w-full"
                  style={{ backgroundColor: imageBackgroundMap[product.imageSrc]?.bgColor || 'transparent' }}
                >
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                  <div
                    className={`absolute inset-0 p-5 md:p-6 flex flex-col justify-between ${
                      !imageBackgroundMap[product.imageSrc]?.isLightBackground
                        ? "bg-gradient-to-t from-black/30 via-black/10 to-transparent"
                        : ""
                    }`}
                  >
                    <div>
                      <p
                        className={`text-[17px] font-semibold uppercase leading-[1.235] tracking-[-0.022em] ${
                           imageBackgroundMap[product.imageSrc]?.isLightBackground
                             ? "text-[#1D1D1F]"
                             : "text-[#F5F5F7]"
                         }`}
                      >
                        {product.title}
                      </p>
                      <h3
                        className={`mt-1 text-[27px] font-bold leading-[1.18] tracking-[0.007em] ${
                           imageBackgroundMap[product.imageSrc]?.isLightBackground
                             ? "text-[#1D1D1F]"
                             : "text-[#F5F5F7]"
                         }`}
                      >
                        {product.description}
                      </h3>
                    </div>

                    <a
                      href={product.linkHref}
                      aria-label={product.linkText}
                      className="absolute bottom-4 right-4 w-9 h-9 md:w-10 md:h-10 bg-[#333336] hover:bg-[#2c2c2c] rounded-[18px] flex items-center justify-center text-[#D6D6D7] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#333336] focus-visible:ring-white"
                    >
                      <PlusIcon className="w-5 h-5 md:w-[22px] md:h-[22px]" />
                    </a>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end items-center mt-6 md:mt-8 -space-x-20 pr-1 md:pr-0">
            <CarouselPrevious
              className="relative w-[50px] h-[50px] rounded-[36px] bg-[#D2D2D7]/64 hover:bg-[#D2D2D7]/80 text-black/56
                         disabled:bg-[#D2D2D7]/30 disabled:text-black/30 disabled:cursor-not-allowed
                         border-none shadow-sm transition-colors
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
            />
            <CarouselNext
              className="relative w-[50px] h-[50px] rounded-[36px] bg-[#D2D2D7]/64 hover:bg-[#D2D2D7]/80 text-black/56
                         disabled:bg-[#D2D2D7]/30 disabled:text-black/30 disabled:cursor-not-allowed
                         border-none shadow-sm transition-colors
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
            />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default CategoryGetToKnowSection;
