import React, { useState } from "react";
import Logo from "./Logo";
import NavAction from "./NavAction";
import NavCategory from "./NavCategory";
import SearchBar from "./SearchBar";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 flex flex-col items-center p-3 sm:p-4 md:p-6 md:flex-row md:justify-between md:items-center shadow-2xl border-[1px] border-gray-900 rounded-b-2xl sm:rounded-b-3xl backdrop-blur-3xl">
      <div className="flex justify-between items-center w-full md:w-auto">
        <Logo />
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none hover:text-gray-300 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col items-center w-full mt-4 space-y-4 animate-in slide-in-from-top">
          <NavCategory />
          <SearchBar />
          <NavAction />
        </div>
      )}

      <div className="hidden md:flex md:flex-row md:items-center md:gap-4 lg:gap-6 w-full md:w-auto">
        <NavCategory />
        <SearchBar />
        <NavAction />
      </div>
    </div>
  );
};

export default Navbar;
