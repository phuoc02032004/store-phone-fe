import React from "react";
import { Button } from "@/components/ui/button";

const IphoneSection: React.FC = () => {
  const useFigmaGradient = true;

  const sectionClasses = `relative w-full h-[600px] md:h-[750px] lg:h-[850px] flex flex-col items-center justify-between text-center p-4 overflow-hidden ${
    useFigmaGradient ? "bg-black" : "bg-black"
  }`;

  const titleClasses = useFigmaGradient
    ? "text-4xl md:text-[62.25px] leading-[1.0281em] tracking-[-0.9253%] font-bold mb-2 text-appleLightGray"
    : "text-5xl md:text-6xl lg:text-7xl leading-[1.0714] tracking-[-0.01em] font-bold mb-2";

  const descriptionClasses = useFigmaGradient
    ? "text-base md:text-[23.0625px] leading-[1.2140921409214092em] tracking-[0.9365853901478011%] font-normal mb-4 text-white max-w-[600px]"
    : "text-lg md:text-xl leading-[1.2] font-normal mb-4 text-opacity-80";

  const preorderFootnoteClasses = useFigmaGradient
    ? "text-sm md:text-[17px] leading-[1.4705882352941178em] tracking-[-2.2000000757329605%] font-medium text-white"
    : "text-base leading-normal tracking-tight font-medium";

  const buttonClasses = useFigmaGradient
    ? `px-4 py-2 md:px-6 md:py-3 rounded-full text-white border-white hover:bg-white hover:text-lightText font-normal text-sm md:text-[17px] leading-[1.1764705882352942em] tracking-[-2.2000000757329605%]`
    : `px-6 py-3 rounded-full text-appleLightGray border-appleLightGray hover:bg-appleLightGray hover:text-lightText font-normal text-base leading-normal tracking-tight`;

  return (
    <section className={sectionClasses}>
      <img
        src="/images/iphone_16_pro__dbqs3s14emky_large.jpg"
        alt="iPhone 16 Pro"
        className="absolute bottom-[100px] md:bottom-[150px] left-1/2 -translate-x-1/2 w-full max-w-[500px] md:max-w-[800px] lg:max-w-[1000px] h-auto object-contain"
      />
      {/* Top content */}
      <div className={`relative z-10 max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto pt-20 ${useFigmaGradient ? "text-white" : "text-appleLightGray"}`}>
        <h3 className={titleClasses}>
          iPhone 16 Pro
        </h3>
        {/* Assuming subtitleImageSrc is not used for iPhone 16 Pro based on the image */}
      </div>

      {/* Bottom content */}
      <div className={`relative z-10 max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto pb-20 ${useFigmaGradient ? "text-white" : "text-appleLightGray"}`}>
        <p className={descriptionClasses}>
          Built for Apple Intelligence — personal, private, powerful. Camera Control, an easier way to quickly access camera tools. Stunning 4K 120 fps Dolby Vision video. A18 Pro chip. And a huge leap in battery life.
        </p>
        <p className={`${preorderFootnoteClasses} mb-2`}>
          Pre-order starting 9.13 Available starting 9.20
        </p>
        <p className={`${preorderFootnoteClasses} mb-4`}>
          Apple Intelligence coming this fall<sup>*</sup>
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
            View pricing
          </Button>
        </div>
      </div>
    </section>
  );
};

export default IphoneSection;