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
    <div className="w-[90%] sm:w-[400px] mx-auto m-10 p-8
      bg-gradient-to-tr from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0)]
            backdrop-blur-[10px]
            rounded-[20px]
            border border-[rgba(255,255,255,0.18)]
            shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]
           ">
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
                  {/* <FormLabel>Email</FormLabel> */}
                  <FormControl>
                    <div className="relative flex items-center">
                      <Input
                        placeholder="Email or Phone Number"
                        type="email"
                        disabled={loading}
                        className="pr-10 rounded-lg border border-input bg-background text-foreground
                                   focus:border-primary focus:ring-primary
                                   dark:border-input-dark dark:bg-background-dark dark:text-foreground-dark
                                   dark:focus:border-primary-dark dark:focus:ring-primary-dark"
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
                  {/* <FormLabel>Password</FormLabel> */}
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      disabled={loading}
                      className="rounded-lg border border-input bg-background text-foreground
                                 focus:border-primary focus:ring-primary
                                 dark:border-input-dark dark:bg-background-dark dark:text-foreground-dark
                                 dark:focus:border-primary-dark dark:focus:ring-primary-dark"
                      {...field}
                    />
                  </FormControl>
                  <div
                    onClick={() => setShowForgotPassword(true)}
                    className="text-white hover:underline text-sm text-right block mt-2 cursor-pointer
                               dark:text-primary-dark"
                  >
                    Forgot password?
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && (
              <div className="text-destructive text-sm mb-4">{error}</div>
            )}
            <Button
              type="submit"
              className="w-full bg-primary text-white hover:bg-primary/90 rounded-lg py-6 text-2xl font-bold
                         dark:bg-primary-dark dark:text-primary-foreground-dark dark:hover:bg-primary-dark/90
                         bg-gradient-to-tr from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0)]
            backdrop-blur-[10px]
            border border-[rgba(255,255,255,0.18)]
            shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Form>
      )}

      <div className="mt-8 text-center text-sm text-white
                      dark:text-muted-foreground-dark">
        <span>Don't have an Apple Account? </span>
        <a href="/register" className="text-blue-300 hover:underline
                                      dark:text-primary-dark">
          Create Your Apple Account <span className="ml-1">{'>'}</span>
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
            className="text-white hover:underline
                       dark:text-primary-dark
                       bg-gradient-to-tr from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0)]
            backdrop-blur-[10px]
            rounded-[20px]
            border border-[rgba(255,255,255,0.18)]
            shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
          >
            Back to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginForm;