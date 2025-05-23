import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/api/auth";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(4, { message: "Password must be at least 4 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

const LoginForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await login(values.email, values.password);
      
      if (response.status === 'success') {
        localStorage.setItem('token', response.data.token);
        navigate('/');
      }
    } catch (err) {
      setError("Invalid email or password");
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (    <div className="w-[90%] sm:w-[450px] md:w-[500px] mx-auto p-4 sm:p-6 rounded-md shadow-md backdrop-blur-3xl bg-white/80">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="text-red-500 text-sm mb-4">{error}</div>
          )}
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="email@example.com" 
                    type="email"
                    disabled={loading}
                    {...field} 
                  />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input 
                    type="password"
                    disabled={loading}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Form>

      <div className="mt-4 text-center text-sm">
        <span>Don't have an account? </span>
        <a href="/register" className="text-primary hover:underline">
          Register
        </a>
      </div>
    </div>
  );
};

export default LoginForm;