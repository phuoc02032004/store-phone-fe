import React, { useState } from "react";
import Logo from "./Logo";
import NavLink from "./NavLink";
import NavAction from "./NavAction";
import NavCategory from "./NavCategory";
import { ShoppingBag, User, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";

const macContent = {
  explore: {
    title: "Explore All Mac",
    description: "MacBook Air, MacBook Pro, iMac, Mac mini, Mac Studio, Mac Pro, Displays",
    items: [
      { href: "/macbook-air", title: "MacBook Air", description: "Thin, light, and powerful." },
      { href: "/macbook-pro", title: "MacBook Pro", description: "Exceptional performance." },
      { href: "/imac", title: "iMac", description: "All in one." },
      { href: "/mac-mini", title: "Mac mini", description: "Compact and versatile." },
      { href: "/mac-studio", title: "Mac Studio", description: "Ultimate power." },
      { href: "/mac-pro", title: "Mac Pro", description: "For professionals." },
      { href: "/mac-display", title: "Displays", description: "Experience peak visuals." },
    ],
  },
  buy: {
    title: "Shop Mac",
    description: "Shop Mac, Mac Accessories, Apple Trade In, Finance",
    items: [
      { href: "/buy-mac", title: "Shop Mac", description: "Learn how to buy a Mac." },
      { href: "/mac-accessories", title: "Mac Accessories", description: "Explore accessories for Mac." },
      { href: "/apple-trade-in", title: "Apple Trade In", description: "Trade in your old device." },
      { href: "/mac-finance", title: "Finance", description: "Financing options." },
    ],
  },
  learnMore: {
    title: "Learn More About Mac",
    description: "Mac Support, AppleCare+ for Mac, macOS Sequoia, Apple Intelligence, Apple Apps, Continuity, iCloud+, Mac for Business, Education",
    items: [
      { href: "/mac-support", title: "Mac Support", description: "Get support for your Mac." },
      { href: "/applecare-plus-mac", title: "AppleCare+ for Mac", description: "Protect your Mac." },
      { href: "/macos-sequoia", title: "macOS Sequoia", description: "The latest operating system." },
      { href: "/apple-intelligence", title: "Apple Intelligence", description: "Intelligent experience." },
      { href: "/apple-apps", title: "Apple Apps", description: "Discover Apple apps." },
      { href: "/continuity", title: "Continuity", description: "Work seamlessly." },
      { href: "/icloud-plus", title: "iCloud+", description: "Secure cloud storage." },
      { href: "/mac-for-business", title: "Mac for Business", description: "Solutions for business." },
      { href: "/mac-for-education", title: "Education", description: "Mac in education." },
    ],
  },
};

const ipadContent = {
  explore: {
    title: "Explore All iPad",
    description: "iPad Pro, iPad Air, iPad, iPad mini",
    items: [
      { href: "/ipad-pro", title: "iPad Pro", description: "Exceptional power." },
      { href: "/ipad-air", title: "iPad Air", description: "Thin, light, and powerful." },
      { href: "/ipad-mini", title: "iPad mini", description: "Compact and convenient." },
    ],
  },
  buy: {
    title: "Shop iPad",
    description: "Shop iPad, iPad Accessories, Apple Trade In, Finance",
    items: [
      { href: "/buy-ipad", title: "Shop iPad", description: "Learn how to buy an iPad." },
      { href: "/ipad-accessories", title: "iPad Accessories", description: "Explore accessories for iPad." },
    ],
  },
  learnMore: {
    title: "Learn More About iPad",
    description: "iPad Support, AppleCare+ for iPad, iPadOS",
    items: [
      { href: "/ipad-support", title: "iPad Support", description: "Get support for your iPad." },
      { href: "/applecare-plus-ipad", title: "AppleCare+ for iPad", description: "Protect your iPad." },
    ],
  },
};

const iphoneContent = {
  explore: {
    title: "Explore All iPhone",
    description: "iPhone 15 Pro, iPhone 15, iPhone SE",
    items: [
      { href: "/iphone-15-pro", title: "iPhone 15 Pro", description: "Peak technology." },
      { href: "/iphone-15", title: "iPhone 15", description: "Powerful and beautiful." },
      { href: "/iphone-se", title: "iPhone SE", description: "Powerful performance, affordable price." },
    ],
  },
  buy: {
    title: "Shop iPhone",
    description: "Shop iPhone, iPhone Accessories, Apple Trade In, Finance",
    items: [
      { href: "/buy-iphone", title: "Shop iPhone", description: "Learn how to buy an iPhone." },
      { href: "/iphone-accessories", title: "iPhone Accessories", description: "Explore accessories for iPhone." },
    ],
  },
  learnMore: {
    title: "Learn More About iPhone",
    description: "iPhone Support, AppleCare+ for iPhone, iOS",
    items: [
      { href: "/iphone-support", title: "iPhone Support", description: "Get support for your iPhone." },
      { href: "/applecare-plus-iphone", title: "AppleCare+ for iPhone", description: "Protect your iPhone." },
    ],
  },
};

const watchContent = {
  explore: {
    title: "Explore All Watch",
    description: "Apple Watch Ultra, Apple Watch Series, Apple Watch SE",
    items: [
      { href: "/apple-watch-ultra", title: "Apple Watch Ultra", description: "Durable and powerful." },
      { href: "/apple-watch-series", title: "Apple Watch Series", description: "Exceptional features." },
      { href: "/apple-watch-se", title: "Apple Watch SE", description: "Affordable price." },
    ],
  },
  buy: {
    title: "Shop Watch",
    description: "Shop Watch, Watch Accessories, Finance",
    items: [
      { href: "/buy-watch", title: "Shop Watch", description: "Learn how to buy a Watch." },
      { href: "/watch-accessories", title: "Watch Accessories", description: "Explore accessories for Watch." },
    ],
  },
  learnMore: {
    title: "Learn More About Watch",
    description: "Watch Support, watchOS",
    items: [
      { href: "/watch-support", title: "Watch Support", description: "Get support for your Watch." },
      { href: "/watchos", title: "watchOS", description: "Watch operating system." },
    ],
  },
};

const visionContent = {
  explore: {
    title: "Explore Apple Vision Pro",
    description: "Experience a new space.",
    items: [
      { href: "/vision-pro", title: "Vision Pro", description: "Breakthrough technology." },
    ],
  },
  buy: {
    title: "Shop Vision Pro",
    description: "Shop Vision Pro, Finance",
    items: [
      { href: "/buy-vision-pro", title: "Shop Vision Pro", description: "Learn how to buy Vision Pro." },
    ],
  },
  learnMore: {
    title: "Learn More About Vision Pro",
    description: "Vision Pro Support",
    items: [
      { href: "/vision-pro-support", title: "Vision Pro Support", description: "Get support for Vision Pro." },
    ],
  },
};

const airpodsContent = {
  explore: {
    title: "Explore All AirPods",
    description: "AirPods Pro, AirPods, AirPods Max",
    items: [
      { href: "/airpods-pro", title: "AirPods Pro", description: "Immersive sound." },
      { href: "/airpods", title: "AirPods", description: "Easy connection." },
      { href: "/airpods-max", title: "AirPods Max", description: "High-quality sound." },
    ],
  },
  buy: {
    title: "Shop AirPods",
    description: "Shop AirPods, AirPods Accessories",
    items: [
      { href: "/buy-airpods", title: "Shop AirPods", description: "Learn how to buy AirPods." },
      { href: "/airpods-accessories", title: "AirPods Accessories", description: "Explore accessories for AirPods." },
    ],
  },
  learnMore: {
    title: "Learn More About AirPods",
    description: "AirPods Support",
    items: [
      { href: "/airpods-support", title: "AirPods Support", description: "Get support for AirPods." },
    ],
  },
};

const tvHomeContent = {
  explore: {
    title: "Explore TV & Home",
    description: "Apple TV, HomePod, HomePod mini",
    items: [
      { href: "/apple-tv", title: "Apple TV", description: "Home entertainment." },
      { href: "/homepod", title: "HomePod", description: "Smart sound." },
    ],
  },
  buy: {
    title: "Shop TV & Home",
    description: "Shop Apple TV, HomePod",
    items: [
      { href: "/buy-apple-tv", title: "Shop Apple TV", description: "Learn how to buy Apple TV." },
      { href: "/buy-homepod", title: "Shop HomePod", description: "Learn how to buy HomePod." },
    ],
  },
  learnMore: {
    title: "Learn More About TV & Home",
    description: "TV & Home Support",
    items: [
      { href: "/tv-home-support", title: "TV & Home Support", description: "Get support for TV & Home." },
    ],
  },
};

const entertainmentContent = {
  explore: {
    title: "Entertainment",
    description: "Apple Music, Apple TV+, Apple Arcade, Apple Books, App Store",
    items: [
      { href: "/apple-music", title: "Apple Music", description: "World of music." },
      { href: "/apple-tv-plus", title: "Apple TV+", description: "Movies and TV shows." },
      { href: "/apple-arcade", title: "Apple Arcade", description: "Unlimited games." },
      { href: "/apple-books", title: "Apple Books", description: "Books and audiobooks." },
      { href: "/app-store", title: "App Store", description: "Apps and games." },
    ],
  },
  buy: {
    title: "Subscribe to Services",
    description: "Subscribe to Apple Music, Apple TV+, Apple Arcade",
    items: [
      { href: "/subscribe-music", title: "Apple Music", description: "Subscribe to Apple Music." },
      { href: "/subscribe-tv-plus", title: "Apple TV+", description: "Subscribe to Apple TV+." },
    ],
  },
  learnMore: {
    title: "Learn More About Entertainment",
    description: "Entertainment Support",
    items: [
      { href: "/entertainment-support", title: "Entertainment Support", description: "Get support for entertainment services." },
    ],
  },
};

const accessoriesContent = {
  explore: {
    title: "Explore Accessories",
    description: "Accessories for iPhone, iPad, Mac, Watch, AirPods",
    items: [
      { href: "/iphone-accessories", title: "iPhone Accessories", description: "Cases, covers, chargers." },
      { href: "/ipad-accessories", title: "iPad Accessories", description: "Keyboards, Apple Pencil." },
      { href: "/mac-accessories", title: "Mac Accessories", description: "Mice, keyboards, hubs." },
    ],
  },
  buy: {
    title: "Shop Accessories",
    description: "Shop genuine Apple accessories",
    items: [
      { href: "/buy-accessories", title: "Shop Accessories", description: "Learn how to buy accessories." },
    ],
  },
  learnMore: {
    title: "Learn More About Accessories",
    description: "Accessories Support",
    items: [
      { href: "/accessories-support", title: "Accessories Support", description: "Get support for accessories." },
    ],
  },
};

const supportContent = {
  explore: {
    title: "Support",
    description: "Technical support, repairs, warranty",
    items: [
      { href: "/get-support", title: "Get Support", description: "Find solutions to your issues." },
      { href: "/repair", title: "Repairs", description: "Schedule a repair." },
      { href: "/warranty", title: "Warranty", description: "Check warranty status." },
    ],
  },
  buy: {
    title: "Support Services",
    description: "AppleCare, AppleCare+",
    items: [
      { href: "/applecare", title: "AppleCare", description: "Extended warranty." },
      { href: "/applecare-plus", title: "AppleCare+", description: "Comprehensive protection." },
    ],
  },
  learnMore: {
    title: "Learn More About Support",
    description: "Support center, community",
    items: [
      { href: "/support-center", title: "Support Center", description: "Access support resources." },
      { href: "/support-community", title: "Support Community", description: "Join discussions." },
    ],
  },
};


const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div
      className="fixed top-0 z-50 flex items-center justify-between px-4 py-1
      bg-black backdrop-blur-[20px] text-white w-full"
    >
      <Logo />
      <nav className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList>
            <NavCategory text="Mac" href="/category/mac" content={macContent} />
            <NavCategory text="iPad" href="/category/ipad" content={ipadContent} />
            <NavCategory text="iPhone" href="/category/iphone" content={iphoneContent} />
            <NavCategory text="Watch" href="/category/watch" content={watchContent} />
            <NavCategory text="Vision" href="/category/vision" content={visionContent} />
            <NavCategory text="AirPods" href="/category/airpods" content={airpodsContent} />
            <NavCategory text="TV & Home" href="/category/tv-home" content={tvHomeContent} />
            <NavCategory text="Entertainment" href="/category/entertainment" content={entertainmentContent} />
            <NavCategory text="Accessories" href="/category/accessories" content={accessoriesContent} />
            <NavCategory text="Support" href="/category/support" content={supportContent} />
            <NavigationMenuItem>
              <NavAction onMenuClick={() => setIsOpen(true)} />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>


      <div className="md:hidden flex items-center space-x-4">
        <ShoppingBag size={20} className="cursor-pointer hover:text-white transition-colors" />
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu size={20} className="cursor-pointer hover:text-white transition-colors" />
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-black text-white border-l border-gray-700">
            <nav className="flex flex-col items-start space-y-4 pt-8">
              <NavLink text="Mac" href="/category/mac" onClick={handleLinkClick} />
              <NavLink text="iPad" href="/category/ipad" onClick={handleLinkClick} />
              <NavLink text="iPhone" href="/category/iphone" onClick={handleLinkClick} />
              <NavLink text="Watch" href="/category/watch" onClick={handleLinkClick} />
              <NavLink text="Vision" href="/category/vision" onClick={handleLinkClick} />
              <NavLink text="AirPods" href="/category/airpods" onClick={handleLinkClick} />
              <NavLink text="TV & Home" href="/category/tv-home" onClick={handleLinkClick} />
              <NavLink text="Entertainment" href="/category/entertainment" onClick={handleLinkClick} />
              <NavLink text="Accessories" href="/category/accessories" onClick={handleLinkClick} />
              <NavLink text="Support" href="/category/support" onClick={handleLinkClick} />
              {localStorage.getItem("token") ? (
        <div>
          <User
            className="w-5 h-5 sm:w-6 sm:h-6 text-white hover:text-gray-300 transition-all hover:scale-110 cursor-pointer"
            onClick={() => navigate("/profile")}
          />
        </div>
      ) : (
        <div className="flex sm:flex-row gap-2 text-white">
          <Button
            className="text-sm sm:text-base hover:text-gray-300 transition-all hover:scale-105"
            onClick={() => navigate("/login")}
            variant="ghost"
          >
            Login
          </Button>
          <Button
            className="text-sm sm:text-base hover:text-gray-300 transition-all hover:scale-105"
            onClick={() => navigate("/register")}
            variant="ghost"
          >
            Register
          </Button>
        </div>
      )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

    </div>
  );
};

export default Navbar;
