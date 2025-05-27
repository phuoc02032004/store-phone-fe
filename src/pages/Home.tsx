import React from "react";
import HeroSection from "@/components/home/HeroSection";
import ProductSection from "@/components/home/ProductSection";
import CouponList from '../components/coupon/CouponList';

const Home: React.FC = () => {
    return (
        <main className="flex flex-col  justify-center items-center">
            <HeroSection />
            <ProductSection/>
            <CouponList />
        </main>
    );
}
export default Home;