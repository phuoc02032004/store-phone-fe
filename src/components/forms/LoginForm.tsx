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
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetPasswordForm from "./ResetPasswordForm";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(4, { message: "Password must be at least 4 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

const LoginForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);
  const [showResetPassword, setShowResetPassword] = useState<boolean>(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState<string>("");
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
        window.location.reload();
      }
    } catch (err) {
      setError("Invalid email or password");
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordSuccess = (email: string) => {
    setForgotPasswordEmail(email);
    setShowForgotPassword(false);
    setShowResetPassword(true);
  };

  return (
    <div className="w-[90%] sm:w-[450px] md:w-[500px] mx-auto p-4 sm:p-6 rounded-md shadow-md backdrop-blur-3xl bg-white/80">
      {showForgotPassword ? (
        <ForgotPasswordForm onSuccess={handleForgotPasswordSuccess} />
      ) : showResetPassword ? (
        <ResetPasswordForm initialEmail={forgotPasswordEmail} onSuccess={() => {
          setShowResetPassword(false);
          setShowForgotPassword(false);
        }} />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      placeholder="Password"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <div
                    onClick={() => setShowForgotPassword(true)}
                    className=" hover:underline text-sm text-right block mt-1 text-black cursor-pointer"
                  >
                    Forgot password?
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && (
              <div className="text-red-500 text-sm mb-4">{error}</div>
            )}
            <Button
              type="submit"
              className="w-full text-white"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Form>
      )}

      <div className="mt-4 text-center text-sm">
        <span>Don't have an account? </span>
        <a href="/register" className="text-primary hover:underline">
          Register
        </a>
      </div>
      {(showForgotPassword || showResetPassword) && (
        <div className="mt-4 text-center text-sm">
          <button
            type="button"
            onClick={() => {
              setShowForgotPassword(false);
              setShowResetPassword(false);
            }}
            className="text-white hover:underline"
          >
            Back to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginForm;