"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"

function BannerCarousel() {
  const plugin = React.useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  const bannerContent = [
    { id: 1, text: "Banner 1", bgColor: "bg-blue-500", url:"https://mir-s3-cdn-cf.behance.net/project_modules/1400/34b5bf180145769.6505ae7623131.jpg" },
    { id: 2, text: "Banner 2", bgColor: "bg-green-500", url:"https://cdn.dribbble.com/users/408720/screenshots/15475347/2.jpg" },
    { id: 3, text: "Banner 3", bgColor: "bg-red-500", url:"https://www.gizmochina.com/wp-content/uploads/2021/10/macbook-pro-2021-renders.jpg" },
    { id: 4, text: "Banner 4", bgColor: "bg-yellow-500", url:"https://www.apple.com/v/iphone-16/c/images/meta/iphone-16_overview__fcivqu9d5t6q_og.png" },
    { id: 5, text: "Banner 5", bgColor: "bg-purple-500", url:"https://cdn.images.express.co.uk/img/dynamic/59/750x445/1551089.jpg" },
  ];

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-6xl mx-auto px-4"
      onMouseEnter={() => {
        plugin.current.stop();
      }}
      onMouseLeave={() => {
        plugin.current.reset();
      }}
    >
      <CarouselContent>
        {bannerContent.map((banner) => (
          <CarouselItem key={banner.id}>
            <div className={`flex aspect-video items-center justify-center text-white text-2xl rounded-xl overflow-hidden h-full`}>
              <img src={banner.url} alt="" className="rounded-xl w-full h-full object-cover max-h-[200px] sm:max-h-[300px] md:max-h-[400px]"/>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

    </Carousel>
  )
}

export default BannerCarousel;