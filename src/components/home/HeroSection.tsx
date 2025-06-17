import React from "react";
import { Button } from "@/components/ui/button";

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-[500px] md:h-[700px] lg:h-[800px] flex items-end justify-center text-center bg-black text-white overflow-hidden">
      <img
        src="/images/hero_static__f5zgxhmj6geq_large.jpg"
        alt="Introducing iPhone 16 Pro and iPhone 16"
        className="absolute inset-0 w-full h-full object-contain"
      />
      <div className="relative z-10 p-4 pb-10 md:pb-20 max-w-4xl mx-auto">
        <h2 className="text-xl md:text-[28px] lg:text-3xl leading-[1.2] font-bold mb-4 text-[#F5F5F7] rounded-lg
            bg-gradient-to-tr from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0)]
            backdrop-blur-[10px]
            border border-[rgba(255,255,255,0.18)]
            shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]
            p-4">
          Introducing iPhone&nbsp;16&nbsp;Pro and&nbsp;iPhone&nbsp;16, built for
          Apple&nbsp;Intelligence. All‑new Apple&nbsp;Watch Series&nbsp;10 and AirPods&nbsp;4.
          Apple&nbsp;Watch Ultra&nbsp;2 and AirPods&nbsp;Max in fresh new colors. And
          AirPods&nbsp;Pro&nbsp;2, with hearing health features coming this&nbsp;fall.
        </h2>
        <Button
          variant="outline"
          className="mt-4 px-6 py-3 rounded-full text-[#F5F5F7] border-[#F5F5F7] hover:bg-[#F5F5F7] hover:text-black
          font-normal text-[17px] leading-[1.1764] tracking-[-2.2000%]"
        >
          Watch the event
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
