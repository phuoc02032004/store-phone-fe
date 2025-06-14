import React from "react";
import BannerCarousel from "../carousel/BannerCarousel";

const HeroSection: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full ">
      <div
        className="container mx-auto flex flex-col md:flex-row items-center justify-between rounded-lg p-4 md:p-8 
        bg-gradient-to-tr from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0)]
        backdrop-blur-[10px]
        border border-[rgba(255,255,255,0.18)]
        shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
      >
        <div className="w-full md:w-1/3 mb-8 md:mb-0 text-white">
          <h1 className="text-6xl font-bold mb-4">
            Explore the world of cutting-edge technology
          </h1>
          <p className="text-lg text-white">
            Discover the latest phone models at great prices.
          </p>
        </div>

        <div className="w-full md:w-2/4">
          <BannerCarousel />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
