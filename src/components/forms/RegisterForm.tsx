import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {register} from '@/api/auth'
import { useNavigate } from "react-router-dom";
import VerifyForm from "./VerifyForm";
import { toast } from "sonner";

const formSchema = z.object({
  username: z.string().min(2, { message: "Usename must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [showVerifyForm, setShowVerifyForm] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await register(data.email, data.password, data.username);
      if(response.status === 'success'){
        setRegisteredEmail(data.email);
        setShowVerifyForm(true);
        toast.success("Registration successful! Please verify your email.");
      } else {
        setError(response.message || "Registration failed.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  const handleVerificationSuccess = () => {
    navigate('/login');
  };

  return (
    <div className="w-[90%] sm:w-[400px] mx-auto
     bg-gradient-to-tr from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0)]
            backdrop-blur-[10px]
            rounded-[20px]
            border border-[rgba(255,255,255,0.18)]
            shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]
            m-10 p-8">
      {showVerifyForm ? (
        <VerifyForm initialEmail={registeredEmail} onSuccess={handleVerificationSuccess} />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative flex items-center">
                      <Input
                        placeholder="Username"
                        disabled={loading}
                        className="pr-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative flex items-center">
                      <Input
                        placeholder="Email or Phone Number"
                        type="email"
                        disabled={loading}
                        className="pr-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      disabled={loading}
                      className="rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      disabled={loading}
                      className="rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && (
              <div className="text-red-500 text-sm mb-4">{error}</div>
            )}
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-lg py-6 mt-6 text-2xl font-bold"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </Form>
      )}
      <div className="mt-8 text-center text-sm text-gray-600">
        <span>Already have an Apple Account? </span>
        <a href="/login" className="text-blue-600 hover:underline">
          Sign in to Apple Store <span className="ml-1">{'>'}</span>
        </a>
      </div>
      {showVerifyForm && (
        <div className="mt-4 text-center text-sm">
          <button
            type="button"
            onClick={() => setShowVerifyForm(false)}
            className="text-white hover:underline"
          >
            Back to Register
          </button>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;