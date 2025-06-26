import React from "react";
import { useNavigate } from "react-router-dom";

const Logo: React.FC = () => {

    const navigate = useNavigate();

    return (       
         <div 
            className="flex items-center cursor-pointer"
            onClick={() => navigate('/')}
        >
            <img
            src="/images/apple_logo.svg"
            alt="Apple Logo"
            className="h-10 sm:h-10 md:h-12 w-8 sm:w-12 md:w-16 transition-transform hover:scale-105"
             />
        </div>
        
    )
};

export default Logo;