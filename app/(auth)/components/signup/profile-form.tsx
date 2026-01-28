"use client";

import { LoadingButton } from "@/components/custom-ui/loading-button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { profileSchema } from "../../validation/auth.validation";

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  onSubmit: (data: ProfileFormData) => void;
  isLoading: boolean;
  onSkip: () => void;
}

export function ProfileForm({ onSubmit, isLoading, onSkip }: ProfileFormProps) {
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onBlur",
    defaultValues: {
      companyName: "",
      phoneNumber: "",
      whatsappNumber: "",
      fullAddress: "",
    },
  });

  const handleSubmit = (values: ProfileFormData) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
        {/* COMPANY NAME */}
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Your company name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* FULL ADDRESS */}
        <FormField
          control={form.control}
          name="fullAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Address</FormLabel>
              <FormControl>
                <Input placeholder="Your business address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* PHONE NUMBER */}
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+8801XXXXXXXXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* WHATSAPP NUMBER */}
        <FormField
          control={form.control}
          name="whatsappNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>WhatsApp Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+8801XXXXXXXXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* BUTTONS */}
        <div className="flex space-x-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onSkip}
          >
            Skip for now
          </Button>

          <LoadingButton loading={isLoading}>Complete Profile</LoadingButton>
        </div>
      </form>
    </Form>
  );
}
