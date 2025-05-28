import React from "react";
import { ShoppingBag, User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItemCount } from "@/store/cartSlice";

const NavAction: React.FC = () => {
  const navigate = useNavigate();
   const itemCount = useSelector(selectCartItemCount);

  return (
    <div className="flex items-center justify-center md:justify-end gap-3 sm:gap-4 lg:gap-6 w-full">
      <div className="relative inline-block"> 
      <ShoppingBag
        className="w-5 h-5 text-white cursor-pointer sm:w-6 sm:h-6 hover:text-gray-900 transition-all hover:scale-110"
        onClick={() => navigate('/cart')} 
      />
      {itemCount > 0 && ( 
        <div
          className="absolute -top-1 -right-1.5 
                     bg-red-500 text-white
                     text-xs font-semibold
                     w-4 h-4 rounded-full
                     flex items-center justify-center
                     pointer-events-none" 
        >
          {itemCount > 9 ? '9+' : itemCount} 
        </div>
      )}
    </div>
      <div className="relative">
        <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-white hover:text-gray-300 transition-all hover:scale-110 cursor-pointer" />
      </div>
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
    </div>
  );
};

export default NavAction;
