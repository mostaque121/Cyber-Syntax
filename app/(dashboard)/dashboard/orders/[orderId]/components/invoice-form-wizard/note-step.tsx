"use client";

import type { InvoiceFormData } from "@/app/(dashboard)/validations/invoice.validation";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { UseFormReturn } from "react-hook-form";

interface InvoiceNotesStepProps {
  form: UseFormReturn<InvoiceFormData>;
  onSendEmailChange?: (value: boolean) => void;
  sendEmail: boolean;
}

export function InvoiceNotesStep({
  form,
  onSendEmailChange,
  sendEmail,
}: InvoiceNotesStepProps) {
  const { control } = form;

  const handleCheckboxChange = (checked: boolean) => {
    if (onSendEmailChange) onSendEmailChange(checked);
  };

  return (
    <div className="space-y-6">
      {/* Optional Notes */}
      <FormField
        control={control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Notes (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="Any notes or remarks" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex items-center space-x-2">
        <Checkbox checked={sendEmail} onCheckedChange={handleCheckboxChange} />
        <span>Send email to customer</span>
      </div>
    </div>
  );
}
