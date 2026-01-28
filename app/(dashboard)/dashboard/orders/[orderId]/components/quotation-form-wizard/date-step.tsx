"use client";

import { QuotationFormData } from "@/app/(dashboard)/validations/quotation.validation";
import { DatePicker } from "@/components/custom-ui/date-picker";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { UseFormReturn } from "react-hook-form";

interface DateStepProps {
  form: UseFormReturn<QuotationFormData>;
}

export function DateStep({ form }: DateStepProps) {
  return (
    <div className="space-y-6">
      {/* Issued Date */}
      <FormField
        control={form.control}
        name="issuedDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Issued Date</FormLabel>
            <FormControl>
              <DatePicker
                selected={field.value}
                onSelect={field.onChange}
                className="w-full bg-transparent"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Due Date */}
      <FormField
        control={form.control}
        name="validUntil"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Valid Until (Optional)</FormLabel>
            <FormControl>
              <DatePicker
                selected={field.value}
                onSelect={field.onChange}
                className="w-full bg-transparent"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
