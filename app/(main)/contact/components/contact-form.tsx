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
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import {
  ContactFormData,
  createContactSubmission,
} from "../../actions/contact.action";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email"),
  phone: z
    .string()
    .regex(/^\+?[0-9]{10,}$/, "Please enter a valid phone number"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  category: z
    .string("Please select a category")
    .min(1, "Please select a category"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: (formData: ContactFormData) =>
      createContactSubmission(formData),
    onSuccess: (result) => {
      if (result.success) {
        setIsSubmitted(true);
        toast.success("Message sent successfully! We'll get back to you soon.");
        form.reset();
      } else {
        toast.error(
          result.error || "Failed to send message. Please try again."
        );
      }
    },
    onError: (error) => {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    },
  });

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      category: "",
      message: "",
    },
  });

  const handleSubmit = (data: ContactFormValues) => {
    mutation.mutate(data);
  };

  // Show thank-you message after successful submission
  if (isSubmitted) {
    return (
      <Card className="bg-white border border-primary p-8 rounded-[5px]">
        <div className="text-center py-12">
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
            Your message has been submitted successfully. We&apos;ll get back to
            you as soon as possible.
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            className="bg-primary hover:bg-green-600 text-white"
          >
            Send Another Message
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white border border-primary p-8 rounded-[5px]">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Send us a Message
        </h2>
        <p className="text-gray-600">
          Have a question? We&apos;d love to hear from you. Send us a message
          and we&apos;ll respond as soon as possible.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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

            {/* Category Field */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 font-semibold">
                    Category
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-gray-300 w-full text-gray-900 focus:border-primary">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white border-gray-300">
                      <SelectItem value="general" className="text-gray-900">
                        General Inquiry
                      </SelectItem>
                      <SelectItem value="support" className="text-gray-900">
                        Customer Support
                      </SelectItem>
                      <SelectItem value="sales" className="text-gray-900">
                        Sales & Billing
                      </SelectItem>
                      <SelectItem value="product" className="text-gray-900">
                        Product Question
                      </SelectItem>
                      <SelectItem value="feedback" className="text-gray-900">
                        Feedback
                      </SelectItem>
                      <SelectItem value="partnership" className="text-gray-900">
                        Partnership
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          </div>

          {/* Subject Field */}
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-900 font-semibold">
                  Subject
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="What is this about?"
                    className="border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          {/* Message Field */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-900 font-semibold">
                  Message
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    className="border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-primary resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="flex gap-3">
            <LoadingButton
              loading={mutation.isPending}
              className="bg-primary hover:bg-green-600 text-white font-semibold flex-1"
              type="submit"
            >
              Send Message
            </LoadingButton>
            <Button
              type="button"
              variant="outline"
              className="border-primary text-primary hover:bg-gray-50 flex-1"
              onClick={() => form.reset()}
            >
              Clear
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
