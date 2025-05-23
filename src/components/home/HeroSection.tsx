import React from "react";
import BannerCarousel from "../carousel/BannerCarousel";

const HeroSection:React.FC = () => {
    return(
        <div className="flex justify-center items-center min-h-screen w-full ">
             <div className="container mx-auto flex flex-col md:flex-row items-center justify-between backdrop-blur-3xl shadow-2xl border-2 border-white/50 rounded-lg p-4 md:p-8 ">
                <div className="w-full md:w-1/3 mb-8 md:mb-0 text-white">
                    <h1 className="text-6xl font-bold mb-4">Welcome to my store!</h1>
                    <p className="text-lg text-white">
                        Discover the latest phone models at great prices.
                    </p>
                </div>

                <div className="w-full md:w-2/4">
                    <BannerCarousel />
                </div>
            </div>
        </div>
       
    )
}

export default HeroSection;
