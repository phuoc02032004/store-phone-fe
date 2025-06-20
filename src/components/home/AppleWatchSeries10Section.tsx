import React from "react";

const AppleWatchSeries10Section: React.FC = () => {
  const useFigmaGradient = false; 

  const sectionClasses = `relative w-full h-[750px] flex flex-col items-center justify-start text-center p-4 overflow-hidden ${
    useFigmaGradient ? "product-display-gradient" : "bg-white"
  }`;

  const descriptionClasses = useFigmaGradient
    ? "text-lg md:text-[23.0625px] leading-[1.2140921409214092em] tracking-[0.9365853901478011%] font-normal mb-4 text-white max-w-[600px]"
    : "text-lg md:text-xl leading-[1.2] font-normal text-lightText pt-15";

  return (
    <section className={sectionClasses}>
      <img
        src="/images/watch_series_10__bjzia1opgyuq_large.jpg"
        alt="Apple Watch Series 10"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] md:max-w-[1000px] lg:max-w-[1200px] h-auto object-contain"
      />
      <div className={`flex-col max-w-xl md:max-w-4xl lg:max-w-5xl pt-20 ${useFigmaGradient ? "text-white" : "text-lightText"}`}>
        
        <div className="flex justify-center">
              <img
                src="/images/logo_watch_series_10__b8mk7vq7k2b6_large.png"
                alt="Apple Watch Series 10 Logo"
                className="mb-4 w-[100px] md:w-[150px] lg:w-[200px]"
                style={{ maxWidth: useFigmaGradient ? "150px" : "200px" }}
              />
        </div>
        
        <div className={descriptionClasses}>
          Our thinnest watch with our biggest display. Invaluable health insights, including sleep apnea notifications. Tracking for your activity and workouts — with depth and water temperature. All in our fastest-charging watch ever.
        </div>
      </div>
    </section>
  );
};

export default AppleWatchSeries10Section;