import React from "react";
import ProductDisplaySection from "@/components/home/ProductDisplaySection";

const ProductDisplayLearnMoreViewPricing: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <ProductDisplaySection
        title="iPhone 16 Pro"
        description="Built for Apple Intelligence — personal, private, powerful. Camera Control, an easier way to quickly access camera tools. Stunning 4K 120 fps Dolby Vision video. A18 Pro chip. And a huge leap in battery life."
        imageSrc="/images/iphone_16_pro__dbqs3s14emky_large.jpg"
        bgColor="bg-black"
        textColor="text-appleLightGray"
        buttonBorderColor="border-appleLightGray"
        buttonHoverBgColor="hover:bg-appleLightGray"
        buttonHoverTextColor="hover:text-lightText"
        preorderText="Pre-order starting 9.13 Available starting 9.20"
        footnote="*"
        footnoteText="Apple Intelligence coming this fall"
        links={[
          { text: "Learn more", href: "#" },
          { text: "View pricing", href: "#" },
        ]}
      />
    </div>
  );
};

export default ProductDisplayLearnMoreViewPricing;