import React from "react";
import { Button } from "@/components/ui/button";

const AirPods4Section: React.FC = () => {
  const useFigmaGradient = false; 

  const sectionClasses = `relative w-full h-[750px] flex flex-col items-center justify-between text-center p-4 overflow-hidden ${
    useFigmaGradient ? "product-display-gradient" : "bg-black"
  }`;

  const titleClasses = useFigmaGradient
    ? "text-[62.25px] leading-[1.0281em] tracking-[-0.9253%] font-bold mb-2 text-[#F5F5F7]"
    : "text-5xl md:text-6xl lg:text-7xl leading-[1.0714] tracking-[-0.01em] font-bold mb-2";

  const descriptionClasses = useFigmaGradient
    ? "text-[23.0625px] leading-[1.2140921409214092em] tracking-[0.9365853901478011%] font-normal mb-4 text-white max-w-[600px]"
    : "text-lg md:text-xl leading-[1.2] font-normal mb-4 text-opacity-80";

  const preorderFootnoteClasses = useFigmaGradient
    ? "text-[17px] leading-[1.4705882352941178em] tracking-[-2.2000000757329605%] font-medium text-white"
    : "text-base leading-normal tracking-tight font-medium";

  const buttonClasses = useFigmaGradient
    ? `px-6 py-3 rounded-full text-white border-white hover:bg-white hover:text-black font-normal text-[17px] leading-[1.1764705882352942em] tracking-[-2.2000000757329605%]`
    : `px-6 py-3 rounded-full text-[#F5F5F7] border-[#F5F5F7] hover:bg-[#F5F5F7] hover:text-black font-normal text-base leading-normal tracking-tight`;

  return (
    <section className={sectionClasses}>
      <img
        src="/images/airpods_4__bmm7k3ocqng2_large.jpg"
        alt="AirPods 4"
        className="absolute  left-1/2 -translate-x-1/2 min-h-screen h-auto object-cover"
      />
      <div className={`relative z-10 max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto pt-20 ${useFigmaGradient ? "text-white" : "text-[#F5F5F7]"}`}>   
      </div>

      <div className={`relative z-10 max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto pb-20 ${useFigmaGradient ? "text-white" : "text-[#F5F5F7]"}`}>
        <h3 className={titleClasses}>
          AirPods 4
        </h3>
        <p className={descriptionClasses}>
          Updated fit for all-day comfort. A totally transformed audio experience. And available with Active Noise Cancellation — a first for this open-ear design.
        </p>
        <p className={`${preorderFootnoteClasses} mb-2`}>
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

export default AirPods4Section;