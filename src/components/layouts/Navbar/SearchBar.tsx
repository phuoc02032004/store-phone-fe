import React, { useState } from "react";
import { searchProducts } from "@/api/product";
import type { Product } from "@/types/Product";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const SearchBar: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (value: string) => {
    setSearchTerm(value);
    if (value.trim() === "") {
      setProducts([]);
      setIsSearchOpen(false);
      return;
    }
    try {
      const response = await searchProducts(value);
      setProducts(response);
      setIsSearchOpen(true);
    } catch (error) {
      console.error("Error searching products:", error);
      setProducts([]);
      setIsSearchOpen(false);
    }
  };

  const handleFocus = () => {
    if (searchTerm.trim() !== "") {
      setIsSearchOpen(true);
    }
  };

  const handleBlur = () => {
    
    setTimeout(() => {
      setIsSearchOpen(false);
    }, 100);
  };

  return (
    <div className="w-full flex justify-center md:justify-start relative">
      <Command>
        <CommandInput
          placeholder="Search products..."
          className="relative"
          onValueChange={handleSearch}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={searchTerm}
        />
        {isSearchOpen && (
          <CommandList className="absolute top-16 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-[400px] overflow-y-auto z-10">
            <CommandEmpty>No results found.</CommandEmpty>
            {products.length > 0 ? (
              <CommandGroup heading="Products">
                {products.map((product) => (
                  <CommandItem key={product._id} value={product.name}>
                    <a href={`/product/${product._id}`} className="flex items-center w-full">
                      {product.name}
                    </a>
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : (
              <CommandGroup heading="Suggestions">
                <CommandItem>No products found. Try a different search term.</CommandItem>
              </CommandGroup>
            )}
          </CommandList>
        )}
      </Command>
    </div>
  );
};

export default SearchBar;
