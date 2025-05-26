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
    <div className="relative px-4 py-8 mx-auto max-w-[1400px]">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.reset()}
      >
        <CarouselContent className="-ml-4">
          {products.slice().reverse().slice().map((product) => (
            <CarouselItem
              key={product._id}
              className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/4"
            >
              <Link to={`/product/${product._id}`} className="block cursor-pointer">
                <div className="p-2">
                  <ProductCard product={product} />
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex -left-6 sm:-left-8 h-10 w-10 sm:h-12 sm:w-12 border-2 border-blue-600 bg-white hover:bg-blue-50" />
        <CarouselNext className="hidden sm:flex -right-6 sm:-right-8 h-10 w-10 sm:h-12 sm:w-12 border-2 border-blue-600 bg-white hover:bg-blue-50" />
      </Carousel>
    </div>
  )
}

export default ProductCarousel
