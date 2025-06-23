import React from 'react';

interface ProductImageGalleryProps {
  productName: string;
  image: string[];
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ productName, image }) => {
  return (
    <div className="relative group">
      <div className="aspect-[4/3] rounded-lg overflow-hidden bg-card shadow-lg m-6">
        <img
          src={image[0]}
          alt={productName}
          className="w-full h-full object-contain transform transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
    </div>
  );
};

export default ProductImageGallery;