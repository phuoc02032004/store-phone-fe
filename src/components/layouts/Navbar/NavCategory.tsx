import React, { useState, useEffect } from "react";
import { useTheme } from '@/context/ThemeContext';
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
// import { cn } from "@/lib/utils";
import { getChild } from "@/api/category"; 
import type { Category } from "@/types/Category";

interface NavCategoryItem {
  href: string;
  title: string;
  _id?: string; // Add _id as an optional property
  description?: string; 
}

interface NavContentSection {
  href?: string;
  title: string; 
  description?: string; 
  items: NavCategoryItem[]; 
}

interface NavCategoryProps {
  text: string; 
  href: string; 
  categoryId?: string; 
  content?: { 
    explore: NavContentSection;
    buy: NavContentSection;
    learnMore: NavContentSection;
  };
}

const NavCategory: React.FC<NavCategoryProps> = ({ text, href, categoryId, content }) => {
  const [childCategories, setChildCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchChildCategories = async () => {
      if (categoryId) {
        setLoading(true);
        try {
          const children = await getChild(categoryId);
          setChildCategories(children);
        } catch (error) {
          console.error(`Error fetching children for category ${categoryId}:`, error);
          setChildCategories([]);
        } finally {
          setLoading(false);
        }
      } else {
        setChildCategories([]); 
      }
    };

    fetchChildCategories();
  }, [categoryId]);

  const { theme } = useTheme();

  const largeLinkClasses = `block text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-neutral-800'} hover:text-blue-600 focus:outline-none focus:text-blue-600`;
  const smallLinkClasses = `block text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-neutral-700'} hover:text-blue-600 focus:outline-none focus:text-blue-600`;

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className={`bg-transparent ${theme === 'dark' ? 'text-gray-300 hover:text-white data-[state=open]:text-white' : 'text-[rgba(255,255,255,0.8)] hover:text-white'} hover:bg-transparent data-[state=open]:bg-transparent`}>
        {text}
      </NavigationMenuTrigger>
      <NavigationMenuContent className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-neutral-50 text-text-lightText'} border-none p-10 w-[1000px] grid grid-cols-3 gap-x-10 shadow-xl`}>
        <div>
          <div className={`text-xs uppercase mb-5 ${theme === 'dark' ? 'text-gray-500' : 'text-neutral-500'}`}>
            Khám Phá {text}
          </div>
          <ul className="space-y-3">
            {loading ? (
              <li className={`${theme === 'dark' ? 'text-gray-400' : 'text-neutral-500'}`}>Đang tải...</li>
            ) : (
              <>
                {childCategories.map((child) => (
                  <li key={child._id}>
                    <NavigationMenuLink asChild>
                      <a href={`/category/child/${child._id}`} className={largeLinkClasses}>
                        {child.name}
                      </a>
                    </NavigationMenuLink>
                  </li>
                ))}
                {categoryId && !loading && childCategories.length > 0 && (
                  <>
                    <li className="pt-2">
                      <NavigationMenuLink asChild>
                        <a href="#" className={smallLinkClasses}>
                          So Sánh {text}
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a href="#" className={smallLinkClasses}>
                          Chuyển Từ PC Sang {text}
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>
        </div>

        {content?.buy && (
          <div>
            <div className={`text-xs uppercase mb-5 ${theme === 'dark' ? 'text-gray-500' : 'text-neutral-500'}`}>
              Mua {text}
            </div>
            <ul className="space-y-3">
              <li>
                <NavigationMenuLink asChild>
                  <a href={content.buy.href || href} className={largeLinkClasses}>
                    {content.buy.title}
                  </a>
                </NavigationMenuLink>
              </li>
              {content.buy.items.map((item, index) => (
                <li key={`buy-item-${index}`} className={index === 0 ? "pt-2" : ""}>
                  <NavigationMenuLink asChild>
                    <a href={item.href} className={smallLinkClasses}>
                      {item.title}
                    </a>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </div>
        )}

        {content?.learnMore && (
          <div>
            <div className={`text-xs uppercase mb-5 ${theme === 'dark' ? 'text-gray-500' : 'text-neutral-500'}`}>
              Tìm Hiểu Thêm Về {text}
            </div>
            <ul className="space-y-3">
              <li>
                <NavigationMenuLink asChild>
                  <a href={content.learnMore.href || href} className={largeLinkClasses}>
                    {content.learnMore.title}
                  </a>
                </NavigationMenuLink>
              </li>
              {content.learnMore.items.map((item, index) => (
                <li key={`learnmore-item-${index}`} className={index === 0 ? "pt-2" : ""}>
                  <NavigationMenuLink asChild>
                    <a href={item.href} className={smallLinkClasses}>
                      {item.title}
                    </a>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default NavCategory;