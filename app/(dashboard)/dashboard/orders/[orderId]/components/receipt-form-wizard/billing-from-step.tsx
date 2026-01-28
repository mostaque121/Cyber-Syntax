"use client";

import { ReceiptFormData } from "@/app/(dashboard)/validations/receipt.validation";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { UseFormReturn } from "react-hook-form";

interface BillingFromStepProps {
  form: UseFormReturn<ReceiptFormData>;
}

export function BillingFromStep({ form }: BillingFromStepProps) {
  return (
    <div className="space-y-6">
      {/* Company Name */}
      <FormField
        control={form.control}
        name="billingFrom.companyName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Name</FormLabel>
            <FormControl>
              <Input
                placeholder="Your business name"
                {...field}
                value={field.value ?? ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Address */}
      <FormField
        control={form.control}
        name="billingFrom.address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Input
                placeholder="Full business address"
                {...field}
                value={field.value ?? ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid items-start grid-cols-2 gap-4">
        {/* Email */}
        <FormField
          control={form.control}
          name="billingFrom.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@company.com"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="billingFrom.phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  placeholder="+8801XXXXXXX"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Logo URL */}
      <FormField
        control={form.control}
        name="billingFrom.logoUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Logo URL (Optional)</FormLabel>
            <FormControl>
              <Input
                placeholder="https://your-logo-url.com/logo.png"
                {...field}
                value={field.value ?? ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Logo URL */}
      <FormField
        control={form.control}
        name="billingFrom.website"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Website URL</FormLabel>
            <FormControl>
              <Input
                placeholder="https:www.something.com"
                {...field}
                value={field.value ?? ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
