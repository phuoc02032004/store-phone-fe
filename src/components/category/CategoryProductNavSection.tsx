import React, { useEffect, useState } from "react";
import type { Category } from "@/types/Category";
import { getChild } from "@/api/category";

interface ProductNavItem {
  imageSrc: string;
  imageAlt: string;
  text: string;
  linkHref: string;
  label?: string;
}

interface CategoryProductNavSectionProps {
  categoryId?: string;
}

const CategoryProductNavSection: React.FC<CategoryProductNavSectionProps> = ({ categoryId }) => {
  const [childCategories, setChildCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChildCategories = async () => {
      if (categoryId) {
        try {
          setLoading(true);
          const data = await getChild(categoryId);
          setChildCategories(data);
        } catch (error) {
          console.error("Error fetching child categories:", error);
          setChildCategories([]);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setChildCategories([]); 
      }
    };

    fetchChildCategories();
  }, [categoryId]);

  let productsToDisplay: ProductNavItem[] = [];

  if (categoryId) {
    productsToDisplay = childCategories.map(cat => ({
      imageSrc: cat.image || '',
      imageAlt: cat.name,
      text: cat.name,
      linkHref: `/category/child/${cat._id}`, 
    }));
  } else {
    productsToDisplay = []; 
  }

  if (loading) {
    return <section className="py-4 px-4 bg-card text-card-foreground overflow-x-auto flex"><div>Loading...</div></section>;
  }

  return (
    <section className="py-4 px-4 bg-card text-card-foreground overflow-x-auto flex">
      <div className="flex space-x-8 max-w-7xl mx-auto">
        {productsToDisplay.map((product, index) => (
          <a key={index} href={product.linkHref} className="flex flex-col items-center text-center flex-shrink-0">
            <img src={product.imageSrc} alt={product.imageAlt} className="w-12 h-12 object-contain mb-1" />
            <div className="flex items-center">
              <span className="text-sm font-semibold text-foreground">{product.text}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default CategoryProductNavSection;