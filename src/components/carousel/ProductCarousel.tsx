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
import { Link } from "react-router-dom"

interface ProductCarouselProps {
  products: any[]
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }))

  return (
    <div className="relative py-8 mx-auto max-w-[1400px]">
      <Carousel
        plugins={[plugin.current]}
        className="w-full px-4"
        opts={{
          align: "start",
          slidesToScroll: 1,
        }}
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.reset()}
      >
        <CarouselContent className="-ml-4">
          {products.slice().reverse().slice().map((product) => (
            <CarouselItem
              key={product._id}
              className="basis-full sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <Link to={`/product/${product._id}`} className="block cursor-pointer">
                <div className="p-2">
                  <ProductCard product={product} />
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="h-8 w-8 -left-2 sm:h-10 sm:w-10 sm:-left-6 md:h-12 md:w-12 md:-left-8 border-2 border-blue-600 bg-white hover:bg-blue-50 hidden sm:flex" />
        <CarouselNext className="h-8 w-8 -right-2 sm:h-10 sm:w-10 sm:-right-6 md:h-12 md:w-12 md:-right-8 border-2 border-blue-600 bg-white hover:bg-blue-50 hidden sm:flex" />
      </Carousel>
    </div>
  )
}

export default ProductCarousel
