"use client";

import { LoadingButton } from "@/components/custom-ui/loading-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const emailSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

type EmailFormData = z.infer<typeof emailSchema>;

interface EmailStepProps {
  onSubmit: (data: EmailFormData) => void;
  isLoading: boolean;
}

export function EmailStep({ onSubmit, isLoading }: EmailStepProps) {
  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Label>Email address</Label>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton loading={isLoading} type="submit" className="w-full">
          Send verification code
        </LoadingButton>
      </form>
      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Login
        </Link>
      </p>
    </Form>
  );
}
