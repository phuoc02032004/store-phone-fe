import React from "react";
import LoginForm from "@/components/forms/LoginForm";

const Login:React.FC = () => {
    return(
        <div className="flex flex-col flex-grow w-full items-center justify-center ">
            <h1 className="mb-10 text-4xl font-bold text-white">Login</h1>
            <LoginForm />
        </div>
    )
}

export default Login;