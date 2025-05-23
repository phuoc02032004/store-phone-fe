import React from "react";
import { ShoppingBag, User, Bell  } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NavAction: React.FC = () => {
    const navigate = useNavigate();
    
    return (        <div className="flex items-center justify-center md:justify-end gap-3 sm:gap-4 lg:gap-6 w-full">
            <div className="relative">
                <ShoppingBag 
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white hover:text-gray-300 transition-all hover:scale-110 cursor-pointer" 
                    onClick={() => navigate('/cart')} 
                />
                {/* Add badge here if needed */}
            </div>
            <div className="relative">
                <Bell 
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white hover:text-gray-300 transition-all hover:scale-110 cursor-pointer" 
                />
                {/* Add notification badge here if needed */}
            </div>
            {localStorage.getItem('token') ? (
                <div>
                    <User 
                        className="w-5 h-5 sm:w-6 sm:h-6 text-white hover:text-gray-300 transition-all hover:scale-110 cursor-pointer" 
                        onClick={() => navigate('/profile')}
                    />
                </div>
            ) : (
                <div className="flex sm:flex-row gap-2 text-white">
                    <Button 
                        className="text-sm sm:text-base hover:text-gray-300 transition-all hover:scale-105" 
                        onClick={() => navigate('/login')} 
                        variant="ghost"
                    >
                        Login
                    </Button>
                    <Button 
                        className="text-sm sm:text-base hover:text-gray-300 transition-all hover:scale-105" 
                        onClick={() => navigate('/register')} 
                        variant="ghost"
                    >
                        Register
                    </Button>
                </div>
            )}
        </div>
    )
}   
  
export default NavAction;
