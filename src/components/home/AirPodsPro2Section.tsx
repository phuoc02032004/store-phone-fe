import React from "react";
import { Button } from "@/components/ui/button";

const AirPodsPro2Section: React.FC = () => {
  const useFigmaGradient = false; 

  const sectionClasses = `relative w-full h-[750px] flex flex-col items-center justify-between text-center p-4 overflow-hidden ${
    useFigmaGradient ? "product-display-gradient" : "bg-black"
  }`;

  const titleClasses = useFigmaGradient
    ? "text-5xl md:text-6xl lg:text-7xl leading-[1.0281em] tracking-[-0.9253%] font-bold mb-2 text-appleLightGray"
    : "text-5xl md:text-6xl lg:text-7xl leading-[1.0714] tracking-[-0.01em] font-bold mb-2";

  const descriptionClasses = useFigmaGradient
    ? "text-lg md:text-xl leading-[1.2140921409214092em] tracking-[0.9365853901478011%] font-normal mb-4 text-white max-w-[600px]"
    : "text-lg md:text-xl leading-[1.2] font-normal mb-4 text-opacity-80";

  const buttonClasses = useFigmaGradient
    ? `px-6 py-3 rounded-full text-white border-white hover:bg-white hover:text-black font-normal text-base leading-[1.1764705882352942em] tracking-[-2.2000000757329605%]`
    : `px-6 py-3 rounded-full text-appleLightGray border-appleLightGray hover:bg-appleLightGray hover:text-black font-normal text-base leading-normal tracking-tight`;

  return (
    <section className={sectionClasses}>
      <img
        src="/images/airpods_pro_2__bvu6mvzkewty_large.jpg"
        alt="AirPods Pro 2"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 max-w-[1200px] h-auto object-contain"
      />
      <div className={`relative z-10 max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto pt-20 ${useFigmaGradient ? "text-white" : "text-appleLightGray"}`}>
        <h3 className={titleClasses}>
          AirPods Pro 2
        </h3>
      </div>


      <div className={`relative z-10 max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto pb-20 ${useFigmaGradient ? "text-white" : "text-appleLightGray"}`}>
        <p className={descriptionClasses}>
          Coming this fall with a free software update, the world’s first all-in-one hearing health experience — test, aid, and help protect your hearing.
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
            Buy
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AirPodsPro2Section;