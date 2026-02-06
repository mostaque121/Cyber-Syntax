"use client";

import { LoadingButton } from "@/components/custom-ui/loading-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createServiceRequest } from "../../actions/service-request.action";
import {
  ServiceRequestFormData,
  serviceRequestFormSchema,
} from "../../validation/service-request.validation";

const serviceTypes = [
  { value: "IT_SUPPORT", label: "IT Support" },
  { value: "CCTV_SOLUTION", label: "CCTV Solution" },
  { value: "NETWORKING_SOLUTION", label: "Networking Solution" },
  { value: "SOFTWARE_DEVELOPMENT", label: "Software Development" },
];

interface ServiceRequestFormContentProps {
  className?: string;
  onSuccess?: () => void;
}

// Form content component for use in modals/drawers
export function ServiceRequestFormContent({
  className,
  onSuccess,
}: ServiceRequestFormContentProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: async (formData: ServiceRequestFormData) => {
      const result = await createServiceRequest(formData);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result;
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast.success("Request submitted successfully! We'll contact you soon.");
      form.reset();
      onSuccess?.();
    },
    onError: (error) => {
      console.error("Error submitting request:", error);
      toast.error(
        error.message || "Failed to submit request. Please try again.",
      );
    },
  });

  const form = useForm<ServiceRequestFormData>({
    resolver: zodResolver(serviceRequestFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      problem: "",
      serviceType: undefined,
    },
  });

  const handleSubmit = (data: ServiceRequestFormData) => {
    mutation.mutate(data);
  };

  // Show thank-you message after successful submission
  if (isSubmitted) {
    return (
      <div className={cn("text-center py-8", className)}>
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
        <p className="text-gray-600 mb-6">
          Your service request has been submitted successfully. We&apos;ll get
          back to you as soon as possible.
        </p>
        <Button
          onClick={() => setIsSubmitted(false)}
          className="bg-primary hover:bg-green-600 text-white"
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn("space-y-6", className)}
      >
        <div className="grid grid-cols-1 items-start md:grid-cols-2 gap-4">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-900 font-semibold">
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    className="border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-900 font-semibold">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="john@example.com"
                    type="email"
                    className="border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 items-start md:grid-cols-2 gap-4">
          {/* Phone Field */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-900 font-semibold">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="+1 (555) 123-4567"
                    className="border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          {/* Service Type Field */}
          <FormField
            control={form.control}
            name="serviceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-900 font-semibold">
                  Service Type
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full border-gray-300 text-gray-900 focus:border-primary">
                      <SelectValue placeholder="Select a service type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {serviceTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
        </div>

        {/* Problem Field */}
        <FormField
          control={form.control}
          name="problem"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-900 font-semibold">
                Describe Your Problem
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Please describe the issue or service you need help with..."
                  className="min-h-[120px] resize-none border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-primary"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <LoadingButton
          type="submit"
          loading={mutation.isPending}
          className="w-full bg-primary hover:bg-green-600 text-white font-semibold py-2.5"
        >
          Submit Request
        </LoadingButton>
      </form>
    </Form>
  );
}

interface ServiceRequestFormProps {
  title?: string;
  description?: string;
}

// Standalone form component with Card wrapper
export function ServiceRequestForm({
  title = "Request a Service",
  description = "Fill out the form below and we'll get back to you as soon as possible.",
}: ServiceRequestFormProps) {
  return (
    <Card className="bg-white border border-primary p-8 rounded-[5px]">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
      <ServiceRequestFormContent />
    </Card>
  );
}
