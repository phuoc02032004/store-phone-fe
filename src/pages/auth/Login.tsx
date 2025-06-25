import React from "react";
import LoginForm from "@/components/forms/LoginForm";

const Login:React.FC = () => {
    return(
        <div className="flex flex-col flex-grow max-h-screen items-center justify-center bg-white min-h-screen">
            <img src='https://bsmedia.business-standard.com/_media/bs/img/article/2023-04/17/full/1681718797-2692.jpg' alt="Background" className="absolute inset-0 w-full max-h-scre object-cover z-0" />
            <div className="relative z-10 flex flex-col items-center justify-center p-4">
                <h1 className="mb-8 md:text-4xl font-bold text-lightText">Sign in to Apple Store</h1>
                <LoginForm />
            </div>
        </div>
    )
}

export default Login;