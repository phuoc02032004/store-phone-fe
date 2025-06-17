import React from "react";
import ProductDisplaySection from "@/components/home/ProductDisplaySection";

const ProductDisplayLearnMoreBuy: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <ProductDisplaySection
        title="AirPods Pro 2"
        description="Coming this fall with a free software update, the world’s first all-in-one hearing health experience — test, aid, and help protect your hearing."
        imageSrc="/images/airpods_pro_2__bvu6mvzkewty_large.jpg"
        bgColor="bg-black"
        textColor="text-[#F5F5F7]"
        buttonBorderColor="border-[#F5F5F7]"
        buttonHoverBgColor="hover:bg-[#F5F5F7]"
        buttonHoverTextColor="hover:text-black"
        footnote="5"
        footnoteText="test, aid,"
        links={[
          { text: "Learn more", href: "#" },
          { text: "Buy", href: "#" },
        ]}
      />
    </div>
  );
};

export default ProductDisplayLearnMoreBuy;