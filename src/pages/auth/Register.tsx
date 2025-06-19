import React from 'react'
import RegisterForm from '@/components/forms/RegisterForm'

const Register: React.FC = () => {
    
    return(
        <div className="flex flex-col flex-grow w-full items-center justify-center bg-white min-h-screen">
            <h1 className="mb-8 text-4xl font-bold text-black">Sign up for Apple Store</h1>
            <RegisterForm />
        </div>
    )
}

export default Register
