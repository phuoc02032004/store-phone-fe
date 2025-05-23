import React from 'react'
import RegisterForm from '@/components/forms/RegisterForm'

const Register: React.FC = () => {
    
    return(
        <div className="flex flex-col flex-grow w-full items-center justify-center">
             <h1 className="mb-10 text-4xl font-bold text-white">Register</h1>
            <RegisterForm />
        </div>
    )
}

export default Register
