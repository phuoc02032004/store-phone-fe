import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { verifyEmail } from "@/api/auth";
import { toast } from "sonner";

interface VerifyFormProps {
  initialEmail?: string;
  onSuccess: () => void;
}

const formSchema = z.object({
  verificationCode: z.string().min(1, {
    message: "Verification code is required.",
  }),
});

const VerifyForm: React.FC<VerifyFormProps> = ({ initialEmail = "", onSuccess }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      verificationCode: "",
    },
  });

  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const response = await verifyEmail(initialEmail, values.verificationCode);
      if (response.status === "success") {
        toast.success("Email verified successfully!");
        onSuccess();
      } else {
        toast.error(response.message || "Failed to verify email.");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to verify email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="verificationCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
                <Input placeholder="Enter verification code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full text-white" disabled={loading}>
          {loading ? "Verifying..." : "Verify Email"}
        </Button>
      </form>
    </Form>
  );
};

export default VerifyForm;