"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import ProductCard from "../product/ProductCard"
import type { Product } from "@/types/Product"

interface ProductCarouselProps {
  products: Product[]
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        opts={{
          align: "start",
        }}
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.reset()}
      >
        <CarouselContent className="-ml-4">
          {products.slice().reverse().slice().map((product) => (
            <CarouselItem
              key={product._id}
              className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-8 space-x-4">
          <CarouselPrevious className="static text-white bg-gradient-to-tr from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0)] backdrop-blur-[10px] border border-[rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]" />
          <CarouselNext className="static text-white bg-gradient-to-tr from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0)] backdrop-blur-[10px] border border-[rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]" />
        </div>
      </Carousel>
    </div>
  )
}

export default ProductCarousel
