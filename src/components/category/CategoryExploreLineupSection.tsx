import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming shadcn/ui Button path

// Define ProductColor and Product types based on the visual requirements
interface ProductColor {
  name: string;
  hex: string;
  // If each color variant has a specific image:
  // variantImageSrc?: string;
}

interface Product {
  id: string | number;
  imageSrc: string;
  imageAlt: string;
  colors?: ProductColor[];
  newTag?: string;
  title: string;
  chipInfo: string;
  description: string;
  priceInfo: string;
  learnMoreLink: string;
  buyLink: string;
  category: 'Laptops' | 'Desktops' | 'Displays'; // For tab filtering
}

interface CategoryExploreLineupSectionProps {
  explore_lineup: {
    title: string;
    // Assuming these props are for the "Compare all models" link
    compareLinkText?: string;
    compareLinkHref?: string;
    products: Product[]; // This should now contain all products for all tabs
  };
}

// SVG Icon for the "Buy >" link arrow
const RightArrowIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" fill="currentColor" {...props} aria-hidden="true">
    <path d="M10.707 7.293L6.414 3 5 4.414l3.293 3.293L5 10.914l1.414 1.414 4.293-4.293a1 1 0 000-1.414z" />
  </svg>
);

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  // Placeholder for active color state if swatches become interactive
  // const [activeColorHex, setActiveColorHex] = useState(product.colors?.[0]?.hex);
  

  return (
    <div className="flex flex-col items-center text-center">
      <img
        src={product.imageSrc} // Update if activeColorHex changes image
        alt={product.imageAlt}
        className="w-auto h-40 md:h-48 object-contain mb-4" // Adjusted height
      />

      {product.colors && product.colors.length > 0 && (
        <div className="flex space-x-1.5 mb-3">
          {product.colors.map((color) => (
            <button
              key={color.hex}
              aria-label={color.name}
              // onClick={() => setActiveColorHex(color.hex)}
              className={`w-3 h-3 rounded-full border border-gray-400/50 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500`}
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
      )}

      {product.newTag && (
        <p className="text-[11px] font-semibold text-orange-600 mb-1.5">
          {product.newTag}
        </p>
      )}

      <h3 className="text-xl lg:text-[21px] font-semibold text-[#1d1d1f] mb-1 leading-tight">
        {product.title}
      </h3>
      <p className="text-[13px] text-[#1d1d1f] mb-2">{product.chipInfo}</p>
      <p className="text-[13px] text-[#1d1d1f] leading-snug mb-3 min-h-[40px] max-w-xs">
        {product.description}
      </p>
      <p className="text-[13px] text-[#1d1d1f] mb-5">{product.priceInfo}</p>

      <div className="flex items-center space-x-5">
        <Button
          asChild
          className="bg-[#0071e3] hover:bg-[#0077ed] text-white text-[13px] font-normal px-[15px] py-[7px] h-auto rounded-full"
        >
          <a href={product.learnMoreLink}>Learn more</a>
        </Button>
        <Button
          asChild
          variant="link"
          className="text-[#0071e3] hover:underline text-[13px] font-normal p-0 h-auto"
        >
          <a href={product.buyLink} className="flex items-center">
            Buy
            <RightArrowIcon className="w-3.5 h-3.5 ml-0.5 inline" />
          </a>
        </Button>
      </div>
    </div>
  );
};

const CategoryExploreLineupSection: React.FC<CategoryExploreLineupSectionProps> = ({ explore_lineup }) => {
  const [activeTab, setActiveTab] = useState<'Laptops' | 'Desktops' | 'Displays'>('Laptops');
  const tabs: Array<'Laptops' | 'Desktops' | 'Displays'> = ['Laptops', 'Desktops', 'Displays'];

  const filteredProducts = explore_lineup.products.filter(
    (p) => p.category === activeTab
  );

  return (
    <section className="bg-[#f5f5f7] py-12 md:py-16 text-[#1d1d1f]">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-baseline mb-8 md:mb-10">
          <h2 className="text-[32px] md:text-[40px] font-bold">
            {explore_lineup.title}
          </h2>
          <div className="hidden sm:flex items-center space-x-5 text-[13px] text-[#0071e3] font-normal">
            <a href="#" className="hover:underline">Help me choose ›</a>
            {explore_lineup.compareLinkText && explore_lineup.compareLinkHref && (
                <a href={explore_lineup.compareLinkHref} className="hover:underline">
                    {explore_lineup.compareLinkText} ›
                </a>
            )}
          </div>
        </div>

        <div className="mb-8 md:mb-12">
          <div className="flex space-x-1 bg-neutral-200/70 p-[3px] rounded-full w-max">
            {tabs.map((tabName) => (
              <button
                key={tabName}
                onClick={() => setActiveTab(tabName)}
                className={`px-4 py-[5px] rounded-full text-[13px] font-normal transition-all duration-200 ease-in-out
                  ${activeTab === tabName
                    ? 'bg-white text-black shadow-sm'
                    : 'text-neutral-700 hover:bg-neutral-300/60'
                  }`}
              >
                {tabName}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10">No products available for this category yet.</p>
        )}
        
        {filteredProducts.length > 0 && <hr className="mt-12 md:mt-16 border-neutral-300/80" />}

      </div>
    </section>
  );
};

export default CategoryExploreLineupSection;
