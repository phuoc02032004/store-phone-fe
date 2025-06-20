import React from "react";
import { Button } from "@/components/ui/button";

const AirPodsMaxSection: React.FC = () => {
  const useFigmaGradient = false; 

  const sectionClasses = `relative w-full min-h-[700px] md:min-h-[800px] flex flex-col items-center justify-between text-center p-4 overflow-hidden ${
    useFigmaGradient ? "product-display-gradient" : "bg-white"
  }`;

  const titleClasses = useFigmaGradient
    ? "text-5xl md:text-6xl lg:text-7xl leading-[1.0281em] tracking-[-0.9253%] font-bold mb-2 text-appleLightGray "
    : "text-5xl md:text-6xl lg:text-7xl leading-[1.0714] tracking-[-0.01em] font-bold mb-2";

  const preorderFootnoteClasses = useFigmaGradient
    ? "text-base leading-[1.4705882352941178em] tracking-[-2.2000000757329605%] font-medium text-white"
    : "text-base leading-normal tracking-tight font-medium";

  const buttonClasses = useFigmaGradient
    ? `px-6 py-3 rounded-full text-white border-white hover:bg-white hover:text-lightText font-normal text-base leading-[1.1764705882352942em] tracking-[-2.2000000757329605%]`
    : `px-6 py-3 rounded-full text-appleTextGray border-appleTextGray hover:bg-appleTextGray hover:text-white font-normal text-base leading-normal tracking-tight`;

  return (
    <section className={sectionClasses}>
      <img
        src="/images/airpods_max__ekwd5ba5gpm6_large.jpg"
        alt="AirPods Max"
        className="absolute top-10 md:top-20 left-1/2 -translate-x-1/2 w-full max-w-[300px] md:max-w-[600px] h-auto object-contain"
      />
      <div className={`relative z-10 max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto pt-10 md:pt-20 ${useFigmaGradient ? "text-white" : "text-appleTextGray"}`}>
        <h3 className={titleClasses}>
          AirPods Max
        </h3>
      </div>

      <div className={`relative z-10 max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto pb-10 md:pb-20 ${useFigmaGradient ? "text-white" : "text-appleTextGray"}`}>
       
        <p className={`${preorderFootnoteClasses} mb-2 ` }>
          Available starting 9.20
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
    </section>
  );
};

export default AirPodsMaxSection;