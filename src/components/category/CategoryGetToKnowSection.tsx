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
  category: string;
  headline: string; 
  bgColor?: string; 
  textColor?: string; 
  isLightBackground?: boolean;
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

const CategoryGetToKnowSection: React.FC<CategoryGetToKnowSectionProps> = ({ get_to_know }) => {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-[40px] font-bold text-[#1d1d1f] mb-10 md:mb-12">
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
                  className="relative rounded-[18px] overflow-hidden group h-[480px] md:h-[500px] w-full"
                  style={{ backgroundColor: product.bgColor }}
                >
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                  <div
                    className={`absolute inset-0 p-5 md:p-6 flex flex-col justify-between ${
                      !product.isLightBackground && !product.textColor
                        ? "bg-gradient-to-t from-black/30 via-black/10 to-transparent"
                        : ""
                    }`}
                  >
                    <div>
                      <p
                        className={`text-xs font-semibold uppercase tracking-wider ${
                          product.textColor ||
                          (product.isLightBackground
                            ? "text-gray-700" 
                            : "text-white/90") 
                        }`}
                      >
                        {product.category}
                      </p>
                      <h3
                        className={`mt-1 text-2xl md:text-[27px] font-bold leading-tight ${ 
                          product.textColor ||
                          (product.isLightBackground
                            ? "text-black"
                            : "text-white")
                        }`}
                      >
                        {product.headline}
                      </h3>
                    </div>

                    <button
                      className="absolute bottom-4 right-4 w-9 h-9 md:w-10 md:h-10 bg-[#3B3B3B] hover:bg-[#2c2c2c] rounded-full flex items-center justify-center text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#3B3B3B] focus-visible:ring-white"
                      aria-label={`Learn more about ${product.category}`}
                    >
                      <PlusIcon className="w-5 h-5 md:w-[22px] md:h-[22px]" />
                    </button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end items-center mt-6 md:mt-8 space-x-2 pr-1 md:pr-0">
            <CarouselPrevious
              className="relative w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600
                         disabled:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed
                         border-none shadow-sm transition-colors
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
            />
            <CarouselNext
              className="relative w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600
                         disabled:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed
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


// const SampleGetToKnowPage = () => {
//   const getToKnowData = {
//     title: "Get to know Mac.",
//     products: [
//       {
//         imageSrc: "/images/mac-get-to-know-1.jpg", // Replace with your actual image path
//         imageAlt: "Colorful abstract waves with hello text",
//         category: "Getting Started",
//         headline: "Easy to use. Easy to love.",
//         // textColor: "text-white", // Handled by default for dark backgrounds
//       },
//       {
//         imageSrc: "/images/mac-get-to-know-2.jpg", // Replace with your actual image path
//         imageAlt: "Person working on a MacBook in an airy location",
//         category: "Performance and Battery Life",
//         headline: "Go fast. Go far.",
//         // textColor: "text-white", // Handled by default
//       },
//       {
//         imageSrc: "/images/mac-get-to-know-3.jpg", // Replace with your actual image path (screenshot of Mac & iPhone)
//         imageAlt: "Mac and iPhone screens showing continuity features",
//         category: "Mac and iPhone",
//         headline: "Dream team.",
//         bgColor: "#E9E5F2", // Light purple background
//         isLightBackground: true, // Hint for text color
//         // textColor: "text-black", // Or specify directly
//       },
//       {
//         imageSrc: "/images/mac-get-to-know-4.jpg", // Replace with actual image (app icons grid)
//         imageAlt: "Grid of popular application icons",
//         category: "Compatibility",
//         headline: "Mac runs your favorite apps.",
//         bgColor: "#F5F5F7", // Light gray background
//         isLightBackground: true,
//         // textColor: "text-black",
//       },
//       // Add more products as needed
//     ],
//   };

//   return <CategoryGetToKnowSection get_to_know={getToKnowData} />;
// };
