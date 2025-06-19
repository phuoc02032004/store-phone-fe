import React from "react";
import HeroSection from "@/components/home/HeroSection";
import IphoneSection from "@/components/home/IphoneSection";
import AppleWatchSeries10Section from "@/components/home/AppleWatchSeries10Section";
import AppleWatchUltra2Section from "@/components/home/AppleWatchUltra2Section";
import AirPods4Section from "@/components/home/AirPods4Section";
import AirPodsMaxSection from "@/components/home/AirPodsMaxSection";
import AirPodsPro2Section from "@/components/home/AirPodsPro2Section";
import ProductSection from "@/components/home/ProductSection";

const Home: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center">
      <HeroSection />
      <IphoneSection />
      <AppleWatchSeries10Section />
      <AppleWatchUltra2Section />
      <AirPods4Section />
      <AirPodsPro2Section />
      <AirPodsMaxSection />
      <ProductSection />
    </main>
  );
};

export default Home;