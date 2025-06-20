import React from "react";
import LoginForm from "@/components/forms/LoginForm";

const Login:React.FC = () => {
    return(
        <div className="flex flex-col flex-grow w-full items-center justify-center bg-white min-h-screen">
            <h1 className="mb-8 text-4xl font-bold text-lightText">Sign in to Apple Store</h1>
            <LoginForm />
        </div>
    )
}

export default Login;