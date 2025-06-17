import React from "react";
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface NavCategoryProps {
  text: string;
  href: string;
  content: {
    explore: { href?: string; title: string; description: string; items: { href: string; title: string; description: string; }[] };
    buy: { href?: string; title: string; description: string; items: { href: string; title: string; description: string; }[] };
    learnMore: { href?: string; title: string; description: string; items: { href: string; title: string; description: string; }[] };
  };
}

const NavCategory: React.FC<NavCategoryProps> = ({ text, href, content }) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="bg-transparent text-[rgba(255,255,255,0.8)] hover:text-white hover:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-white">
        {text}
      </NavigationMenuTrigger>
      <NavigationMenuContent className="bg-white text-black border-none p-10 min-w-screen  grid grid-cols-3 gap-x-10">
        <div>
          <div className="text-xs text-gray-500 uppercase mb-4">
            Khám Phá Mac
          </div>
          <ul className="grid gap-3">
            <li className="row-span-3">
              <NavigationMenuLink asChild>
                <a
                  className="flex h-full w-full select-none flex-col justify-start no-underline outline-none"
                  href={content.explore.href || href}
                >
                  <div className="text-2xl font-bold mb-4">
                    {content.explore.title}
                  </div>
                </a>
              </NavigationMenuLink>
            </li>
            {content.explore.items.map((item, index) => (
              <ListItem key={index} href={item.href} title={item.title}>
                {item.description}
              </ListItem>
            ))}
            <ListItem href="#" title="So Sánh Mac" />
            <ListItem href="#" title="Chuyển Từ PC Sang Mac" />
          </ul>
        </div>
        <div>
          <div className="text-xs text-gray-500 uppercase mb-4">
            Mua Mac
          </div>
          <ul className="grid gap-3">
            <li className="row-span-3">
              <NavigationMenuLink asChild>
                <a
                  className="flex h-full w-full select-none flex-col justify-start no-underline outline-none"
                  href={content.buy.href || href}
                >
                  <div className="text-2xl font-bold mb-4">
                    {content.buy.title}
                  </div>
                </a>
              </NavigationMenuLink>
            </li>
            {content.buy.items.map((item, index) => (
              <ListItem key={index} href={item.href} title={item.title}>
                {item.description}
              </ListItem>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs text-gray-500 uppercase mb-4">
            Tìm Hiểu Thêm Về Mac
          </div>
          <ul className="grid gap-3">
            <li className="row-span-3">
              <NavigationMenuLink asChild>
                <a
                  className="flex h-full w-full select-none flex-col justify-start no-underline outline-none"
                  href={content.learnMore.href || href}
                >
                  <div className="text-2xl font-bold mb-4">
                    {content.learnMore.title}
                  </div>
                </a>
              </NavigationMenuLink>
            </li>
            {content.learnMore.items.map((item, index) => (
              <ListItem key={index} href={item.href} title={item.title}>
                {item.description}
              </ListItem>
            ))}
          </ul>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100",
            className
          )}
          {...props}
        >
          <div className="text-sm text-gray-700 font-normal">{title}</div>
          {/* Removed description as per image */}
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export default NavCategory;
