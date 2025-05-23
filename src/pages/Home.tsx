import React from "react";
import HeroSection from "@/components/home/HeroSection";
import ProductSection from "@/components/home/ProductSection"

const Home: React.FC = () => {
    return (
        <main className="flex flex-col  justify-center items-center">
            <HeroSection /> 
            <ProductSection/>
        </main>
    );
    }
export default Home;