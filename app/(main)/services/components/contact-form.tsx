"use client";

import { LoadingButton } from "@/components/custom-ui/loading-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import { ServiceType } from "@/prisma/generated/prisma";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createServiceOrder } from "../../actions/service-order.action";
import {
  ServiceContactFormData,
  serviceContactFormSchema,
} from "../../validation/order-contact-validation";

interface ServiceContactFormProps {
  serviceType: ServiceType;
  serviceName?: string;
}

export function ServiceContactForm({
  serviceType,
  serviceName,
}: ServiceContactFormProps) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [isSubmitted, setIsSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: (formData: ServiceContactFormData) =>
      createServiceOrder({ serviceType, serviceName, formData }),
    onSuccess: () => {
      setIsSubmitted(true); // Show success message
      toast.success("Order placed successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to place order. Please try again.");
    },
  });

  const form = useForm<ServiceContactFormData>({
    resolver: zodResolver(serviceContactFormSchema),
    defaultValues: {
      fullName: user?.name || "",
      companyName: user?.companyName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      fullAddress: user?.fullAddress || "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        fullName: user.name || "",
        companyName: user.companyName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        fullAddress: user.fullAddress || "",
      });
    }
  }, [user, form]);

  const handleSubmit = (data: ServiceContactFormData) => {
    mutation.mutate(data);
  };

  // Show thank-you message after successful submission
  if (isSubmitted) {
    return (
      <div className="text-center p-8 bg-background rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-foreground mb-2">Thank You!</h2>
        <p className="text-muted-foreground">
          Your order has been submitted. We will contact you soon.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        {/* Full Name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                Full Name
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-slate-50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Company Name */}
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name (Optional)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-slate-50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                Email Address
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  className="w-full px-4 py-2 rounded-lg border border-input bg-slate-50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Number */}
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                Phone Number
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="tel"
                  className="w-full px-4 py-2 rounded-lg border border-input bg-slate-50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Full Address */}
        <FormField
          control={form.control}
          name="fullAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                Full Address
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Street, City, State, ZIP"
                  className="resize-none w-full px-4 py-2 rounded-lg border border-input bg-slate-50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <div className="pt-4">
          <LoadingButton
            type="submit"
            loading={mutation.isPending}
            className="w-full"
          >
            Submit
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
