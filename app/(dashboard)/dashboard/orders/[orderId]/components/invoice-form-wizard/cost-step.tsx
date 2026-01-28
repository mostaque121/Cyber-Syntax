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
import type { UseFormReturn } from "react-hook-form";

interface CostsStepProps {
  form: UseFormReturn<InvoiceFormData>;
}

export function CostsStep({ form }: CostsStepProps) {
  return (
    <div className="space-y-6">
      {/* Shipping Cost */}
      <FormField
        control={form.control}
        name="shippingCost"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Shipping Cost</FormLabel>
            <FormControl>
              <NumberInput placeholder="0.00" min={0} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        {/* Product Tax % */}
        <FormField
          control={form.control}
          name="productTaxPercentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Tax (%)</FormLabel>
              <FormControl>
                <NumberInput placeholder="0" min={0} max={100} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Service Tax % */}
        <FormField
          control={form.control}
          name="serviceTaxPercentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Tax (%)</FormLabel>
              <FormControl>
                <NumberInput placeholder="0" min={0} max={100} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Discount % */}
      <FormField
        control={form.control}
        name="discount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Discount (%)</FormLabel>
            <FormControl>
              <NumberInput placeholder="0" min={0} max={100} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
