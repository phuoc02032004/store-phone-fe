import React from "react";
import { Button } from "@/components/ui/button";

const AppleWatchUltra2Section: React.FC = () => {
  const useFigmaGradient = false; 

  const sectionClasses = `relative w-full h-[750px] flex flex-col items-center justify-between text-center p-4 overflow-hidden ${
    useFigmaGradient ? "product-display-gradient" : "bg-black"
  }`;

  const descriptionClasses = useFigmaGradient
    ? "text-lg md:text-[23.0625px] leading-[1.2140921409214092em] tracking-[0.9365853901478011%] font-normal mb-4 text-white max-w-[600px]"
    : "text-lg md:text-xl leading-[1.2] font-normal mb-4 text-opacity-80";


  const buttonClasses = useFigmaGradient
    ? `px-4 py-2 md:px-6 md:py-3 rounded-full text-white border-white hover:bg-white hover:text-lightText font-normal text-base leading-[1.1764705882352942em] tracking-[-2.2000000757329605%]`
    : `px-4 py-2 md:px-6 md:py-3 rounded-full text-appleLightGray border-appleLightGray hover:bg-appleLightGray hover:text-lightText font-normal text-base leading-normal tracking-tight`;

  return (
    <section className={sectionClasses}>
      <img
        src="/images/watch_ultra_2__didkrmqgz0ia_large.jpg"
        alt="Apple Watch Ultra 2"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] md:max-w-[800px] lg:max-w-[1000px] h-auto object-contain"
      />

      <div className={`relative z-10 max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto pt-20 ${useFigmaGradient ? "text-white" : "text-appleLightGray"}`}>
        <img
          src="/images/logo_watch_ultra_2__1xqo1s2atgyq_large.png"
          alt="Apple Watch Ultra 2 Logo"
          className="mx-auto mb-4 w-[100px] md:w-[150px] lg:w-[200px]"
          style={{ maxWidth: useFigmaGradient ? "100px" : "200px" }}
        />
        <div className={`relative z-10 max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto pb-20 ${useFigmaGradient ? "text-white" : "text-appleLightGray"}`}>
        <p className={descriptionClasses}>
          The ultimate sports and adventure watch features a stunning new black titanium case. With connectivity, health, and safety features for the everyday. And the most accurate GPS in a sports watch.
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <Button
            variant="outline"
            className={buttonClasses}
          >
            Learn more
          </Button>
          <Button
            variant="outline"
            className={buttonClasses}
          >
            Pre-order
          </Button>
        </div>
      </div>
      </div>
    
    </section>
  );
};

export default AppleWatchUltra2Section;