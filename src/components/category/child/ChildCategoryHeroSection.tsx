import React from 'react';

interface ChildCategoryHeroSectionProps {
  categoryName: string;
}

const ChildCategoryHeroSection: React.FC<ChildCategoryHeroSectionProps> = ({ categoryName }) => {
  return (
    <section className="relative w-full h-[600px] flex items-center justify-center text-center overflow-hidden bg-black">
      <img
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/images/mac_hero.jpg"
        alt="Category Hero"
      />
      <div className="relative z-10 text-white p-4">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4">
          {categoryName}
        </h1>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-8">
          If you can dream it, {categoryName} can do it.
        </h2>
        <button className="bg-gray-200 text-black px-6 py-3 rounded-full text-lg font-medium hover:bg-gray-300 transition-colors flex items-center mx-auto">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
          Play welcome animation video
        </button>
      </div>
    </section>
  );
};

export default ChildCategoryHeroSection;