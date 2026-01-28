"use client";

import { ReceiptFormData } from "@/app/(dashboard)/validations/receipt.validation";
import { DatePicker } from "@/components/custom-ui/date-picker";
import { NumberInput } from "@/components/custom-ui/number-input";
import {
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
import type { UseFormReturn } from "react-hook-form";
interface PaymentStatusStepProps {
  form: UseFormReturn<ReceiptFormData>;
}

export function PaymentStatusStep({ form }: PaymentStatusStepProps) {
  const { control } = form;

  return (
    <div className="space-y-6 grid gap-4 items-start grid-cols-1 md:grid-cols-2">
      <FormField
        control={control}
        name="paidAmount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Paid Amount</FormLabel>
            <FormControl>
              <NumberInput placeholder="Enter paid amount" min={0} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="paymentMethod"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Payment Method</FormLabel>

            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="CASH">Cash</SelectItem>
                  <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
                  <SelectItem value="CARD">Card</SelectItem>
                  <SelectItem value="MOBILE_BANKING">Mobile Banking</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="paymentReference"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Payment refarence (optional)</FormLabel>
            <FormControl>
              <Input placeholder="John doe" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="paymentDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Payment Date</FormLabel>
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
