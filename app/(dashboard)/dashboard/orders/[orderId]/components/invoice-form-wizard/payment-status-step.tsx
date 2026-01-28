"use client";

import type { InvoiceFormData } from "@/app/(dashboard)/validations/invoice.validation";
import { NumberInput } from "@/components/custom-ui/number-input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { UseFormReturn } from "react-hook-form";
interface PaymentStatusStepProps {
  form: UseFormReturn<InvoiceFormData>;
}

export function PaymentStatusStep({ form }: PaymentStatusStepProps) {
  const { control } = form;

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="paymentStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Payment Status</FormLabel>
            <FormControl>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="PAID" id="paid" />
                  <label htmlFor="paid">PAID</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="UNPAID" id="unpaid" />
                  <label htmlFor="unpaid">UNPAID</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="PARTIALLY_PAID" id="partial" />
                  <label htmlFor="partial">PARTIALLY PAID</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

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
    </div>
  );
}
