import React from "react";
import LoginForm from "@/components/forms/LoginForm";

const Login:React.FC = () => {
    return(
        <div className="flex flex-col flex-grow max-h-screen items-center justify-center bg-background min-h-screen">
            <img src='https://i.pinimg.com/736x/14/03/5b/14035be7eee644ffbd76e06ecafb4c5d.jpg' alt="Background" className="absolute inset-0 w-full min-h-screen object-cover z-0" />
            <div className="relative z-10 flex flex-col items-center justify-center p-4">
                <h1 className="mb-8 md:text-4xl font-bold text-white">Sign in to Apple Store</h1>
                <LoginForm />
            </div>
        </div>
    )
}

export default Login;