"use client";

import type { InvoiceFormData } from "@/app/(dashboard)/validations/invoice.validation";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { UseFormReturn } from "react-hook-form";

interface BillingToStepProps {
  form: UseFormReturn<InvoiceFormData>;
}

export function BillingToStep({ form }: BillingToStepProps) {
  return (
    <div className="space-y-6">
      {/* Customer Name */}
      <FormField
        control={form.control}
        name="billingTo.customerName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Customer Name</FormLabel>
            <FormControl>
              <Input
                placeholder="Customer full name"
                {...field}
                value={field.value ?? ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Company Name (Optional) */}
      <FormField
        control={form.control}
        name="billingTo.companyName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Name (Optional)</FormLabel>
            <FormControl>
              <Input
                placeholder="Company name if applicable"
                {...field}
                value={field.value ?? ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid items-start md:grid-cols-2 gap-4">
        {/* Email Address */}
        <FormField
          control={form.control}
          name="billingTo.emailAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="customer@example.com"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Number */}
        <FormField
          control={form.control}
          name="billingTo.phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
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

      {/* Full Address */}
      <FormField
        control={form.control}
        name="billingTo.fullAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Address</FormLabel>
            <FormControl>
              <Input
                placeholder="Customer’s complete address"
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
