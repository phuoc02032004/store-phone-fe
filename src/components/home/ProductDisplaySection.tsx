import React from "react";
import { Button } from "@/components/ui/button";

interface ProductDisplaySectionProps {
  title: string;
  description: string;
  imageSrc: string;
  logoSrc?: string;
  subtitleImageSrc?: string;
  bgColor?: string;
  textColor?: string;
  buttonBorderColor?: string;
  buttonHoverBgColor?: string;
  buttonHoverTextColor?: string;
  preorderText?: string;
  footnote?: string;
  footnoteText?: string;
  useFigmaGradient?: boolean; // New prop for conditional styling
  links: { text: string; href: string; }[];
}

const ProductDisplaySection: React.FC<ProductDisplaySectionProps> = ({
  title,
  description,
  imageSrc,
  logoSrc,
  subtitleImageSrc, 
  bgColor = "bg-black",
  textColor = "text-white",
  buttonBorderColor = "border-white",
  buttonHoverBgColor = "hover:bg-white",
  buttonHoverTextColor = "hover:text-black",
  preorderText,
  footnote,
  footnoteText,
  links,
  useFigmaGradient, 
}) => {
  const sectionClasses = `relative w-full h-[750px] flex flex-col items-center justify-between text-center p-4 overflow-hidden ${
    useFigmaGradient ? "product-display-gradient" : bgColor
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
    : `px-6 py-3 rounded-full ${textColor} ${buttonBorderColor} ${buttonHoverBgColor} ${buttonHoverTextColor} font-normal text-base leading-normal tracking-tight`;

  return (
    <section className={sectionClasses}>
      <img
        src={imageSrc}
        alt={title}
        className="absolute bottom-[100px] left-1/2 -translate-x-1/2 max-w-[800px] h-auto object-contain"
      />
      <div className={`relative z-10 max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto pt-20 ${useFigmaGradient ? "text-white" : textColor}`}>
        {logoSrc && !subtitleImageSrc && (
          <img
            src={logoSrc}
            alt={`${title} Logo`}
            className="mx-auto mb-4"
            style={{ maxWidth: useFigmaGradient ? "200px" : "300px" }}
          />
        )}
        <h3 className={titleClasses}>
          {title}
        </h3>
        {subtitleImageSrc && (
          <img
            src={subtitleImageSrc}
            alt="Hello, Apple Intelligence."
            className="mx-auto mb-4"
            style={{ maxWidth: useFigmaGradient ? "300px" : "300px" }}
          />
        )}
      </div>

      <div className={`relative z-10 max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto pb-20 ${useFigmaGradient ? "text-white" : textColor}`}>
        <p className={descriptionClasses}>
          {description}
        </p>
        {preorderText && (
          <p className={`${preorderFootnoteClasses} mb-2`}>
            {preorderText}
          </p>
        )}
        {footnote && (
          <p className={`${preorderFootnoteClasses} mb-4`}>
            {footnoteText}<sup>{footnote}</sup>
          </p>
        )}
        <div className="flex justify-center space-x-4 mt-4">
          {links.map((link, index) => (
            <Button
              key={index}
              variant="outline"
              className={buttonClasses}
            >
              {link.text}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductDisplaySection;
