import React from "react";
import { useNavigate } from "react-router-dom";

const Logo: React.FC = () => {

    const navigate = useNavigate();

    return (        <div 
            className="flex justify-start md:justify-start items-center w-full md:w-auto cursor-pointer" 
            onClick={() => navigate('/')}
        >
            <h1 className="text-white ml-10 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center md:text-left transition-transform hover:scale-105">
                STORE
            </h1>
            {/* <img
            src=""
            alt="logo"
            className="h-8 sm:h-10 md:h-12 w-auto transition-transform hover:scale-105"
             /> */}
        </div>
        
    )
};

export default Logo;