import React from "react";

interface CategoryHeroSectionProps {
  hero: {
    title: string;
    description: string; 
    imageSrc: string;
    imageAlt: string;
    linkText?: string; 
    linkHref?: string; 
  };
}

const CategoryHeroSection: React.FC<CategoryHeroSectionProps> = ({ hero }) => {
  const taglineLines = hero.description.split('\n');

  return (
    <section className="bg-background min-h-screen py-10 md:py-16 px-4 sm:px-8 md:px-12 lg:px-16">
      <div className="flex justify-between items-baseline mb-8 md:mb-10 lg:mb-12">
        <h1 className="text-[77.5px] font-bold leading-tight text-foreground">
          {hero.title}
        </h1>
        <p className="text-[27px] font-bold leading-tight text-foreground text-right pt-2">
          {taglineLines[0]}
          {taglineLines.length > 1 && <br />}
          {taglineLines[1]}
        </p>
      </div>

      <div className="relative rounded-[30px] sm:rounded-[36px] md:rounded-[40px] overflow-hidden shadow-sm">
        <img
          src={hero.imageSrc}
          alt={hero.imageAlt}
          className="w-full h-auto object-cover block"
        />
        <button
          className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8
                     w-10 h-10 sm:w-11  md:w-12 md:h-12
                     bg-appleLightGray/80 hover:bg-appleLightGray/100 backdrop-blur-sm
                     rounded-full flex items-center justify-center
                     transition-all duration-200 ease-in-out
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-75 dark:bg-appleDarkGray/80 dark:hover:bg-appleDarkGray/100"
          aria-label="Pause media"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 md:w-6 md:h-6 text-foreground"
          >
            <path
              fillRule="evenodd"
              d="M6.75 5.25a.75.75 0 0 0-.75.75V18a.75.75 0 0 0 .75.75h1.5a.75.75 0 0 0 .75-.75V6a.75.75 0 0 0-.75-.75h-1.5Zm9 0a.75.75 0 0 0-.75.75V18a.75.75 0 0 0 .75.75h1.5a.75.75 0 0 0 .75-.75V6a.75.75 0 0 0-.75-.75h-1.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default CategoryHeroSection;