import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import NavLink from "./NavLink";
import NavAction from "./NavAction";
import NavCategory from "./NavCategory";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  macContent,
  ipadContent,
  iphoneContent,
  watchContent,
  visionContent,
  airpodsContent,
  tvHomeContent,
  entertainmentContent,
  accessoriesContent,
  supportContent,
} from "@/mock/navbarContent";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 px-4 py-2 text-white w-full flex justify-between items-center transition-all duration-1000 ${
        scrolled ? "bg-black backdrop-blur-[20px]" : "bg-transparent"
      }`}
    >
      <div className="flex-grow flex justify-start">
        <Logo />
      </div>
      <nav className="hidden md:flex md:justify-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavCategory
              text="Mac"
              href="/category/mac/6853a003ccdd9eb4d905829a"
              categoryId="6853a003ccdd9eb4d905829a"
              content={macContent}
            />
            <NavCategory
              text="iPad"
              href="/category/ipad/6853a003ccdd9eb4d905829d"
              categoryId="6853a003ccdd9eb4d905829d"
              content={ipadContent}
            />
            <NavCategory
              text="iPhone"
              href="/category/iphone/6853a003ccdd9eb4d90582a0"
              categoryId="6853a003ccdd9eb4d90582a0"
              content={iphoneContent}
            />
            <NavCategory
              text="Watch"
              href="/category/watch/6853a003ccdd9eb4d90582a3"
              categoryId="6853a003ccdd9eb4d90582a3"
              content={watchContent}
            />
            <NavCategory
              text="Vision"
              href="/category/vision/6853a003ccdd9eb4d90582a6"
              categoryId="6853a003ccdd9eb4d90582a6"
              content={visionContent}
            />
            <NavCategory
              text="AirPods"
              href="/category/airpods/6853a003ccdd9eb4d90582a9"
              categoryId="6853a003ccdd9eb4d90582a9"
              content={airpodsContent}
            />
            <NavCategory
              text="TV & Home"
              href="/category/tv-home/6853a003ccdd9eb4d90582ac"
              categoryId="6853a003ccdd9eb4d90582ac"
              content={tvHomeContent}
            />
            <NavCategory
              text="Entertainment"
              href="/category/entertainment"
              content={entertainmentContent}
            />{" "}
            {/* Using mock data */}
            <NavCategory
              text="Accessories"
              href="/category/accessories"
              content={accessoriesContent}
            />{" "}
            {/* Using mock data */}
            <NavCategory
              text="Support"
              href="/category/support"
              content={supportContent}
            />{" "}
            {/* Using mock data */}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      <div className="flex-grow flex justify-end">
        <NavAction onMenuClick={() => setIsOpen(true)} />
      </div>

      <div className="md:hidden flex items-center space-x-4">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu
              size={20}
              className="cursor-pointer hover:text-white transition-colors"
            />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[250px] sm:w-[300px] bg-black text-white border-l border-gray-700"
          >
            <nav className="flex flex-col items-start space-y-4 pt-8">
              <NavLink
                text="Mac"
                href="/category/mac/68512098278176076b03ac00"
                onClick={handleLinkClick}
              />
              <NavLink
                text="iPad"
                href="/category/ipad/68512099278176076b03ac03"
                onClick={handleLinkClick}
              />
              <NavLink
                text="iPhone"
                href="/category/iphone/68512099278176076b03ac07"
                onClick={handleLinkClick}
              />
              <NavLink
                text="Watch"
                href="/category/watch/68512099278176076b03ac0a"
                onClick={handleLinkClick}
              />
              <NavLink
                text="Vision"
                href="/category/vision/68512099278176076b03ac0d"
                onClick={handleLinkClick}
              />
              <NavLink
                text="AirPods"
                href="/category/airpods/68512099278176076b03ac11"
                onClick={handleLinkClick}
              />
              <NavLink
                text="TV & Home"
                href="/category/tv-home/68512099278176076b03ac15"
                onClick={handleLinkClick}
              />
              <NavLink
                text="Entertainment"
                href="/category/entertainment"
                onClick={handleLinkClick}
              />
              <NavLink
                text="Accessories"
                href="/category/accessories"
                onClick={handleLinkClick}
              />
              <NavLink
                text="Support"
                href="/category/support"
                onClick={handleLinkClick}
              />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Navbar;
