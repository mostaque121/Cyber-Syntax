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
import { ScrollArea } from "@/components/ui/scroll-area";
import { type UseFormReturn } from "react-hook-form";

// --- Static Payment Presets ---
const BANK_OPTIONS = [
  {
    id: "bank1",
    title: "Bank of America",
    defaultValues: {
      bankName: "Bank of America",
      accountName: "Your Company",
      accountNumber: "123456789",
      routingNumber: "987654321",
    },
  },
  {
    id: "bank2",
    title: "Chase Bank",
    defaultValues: {
      bankName: "Chase Bank",
      accountName: "Your Company",
      accountNumber: "111222333",
      routingNumber: "444555666",
    },
  },
];

const MOBILE_OPTIONS = [
  {
    id: "bkash",
    title: "bKash",
    defaultValues: {
      provider: "bKash",
      number: "+8801XXXXXXXXX",
      instructions: "Send the amount to the number and mention invoice ID",
    },
  },
  {
    id: "nagad",
    title: "Nagad",
    defaultValues: {
      provider: "Nagad",
      number: "+8801XXXXXXXXX",
      instructions: "Send the amount to the number and mention invoice ID",
    },
  },
];

interface PaymentInstructionsStepProps {
  form: UseFormReturn<InvoiceFormData>;
}

export function PaymentInstructionsStep({
  form,
}: PaymentInstructionsStepProps) {
  const { control, watch, setValue } = form;

  const bankDetails = watch("paymentInstructions.bankDetails");
  const mobilePayments = watch("paymentInstructions.mobilePayments") || [];

  // --- Bank Payment (exclusive selection like radio) ---
  const handleBankSelection = (
    bank: (typeof BANK_OPTIONS)[number],
    checked: boolean
  ) => {
    setValue(
      "paymentInstructions.bankDetails",
      checked ? bank.defaultValues : undefined,
      { shouldValidate: true }
    );
  };

  // --- Mobile Payment (checkbox style multi-select) ---
  const handleMobileToggle = (
    mp: (typeof MOBILE_OPTIONS)[number],
    checked: boolean
  ) => {
    const current = mobilePayments;
    const provider = mp.defaultValues.provider;

    if (checked) {
      if (!current.some((m) => m.provider === provider)) {
        setValue(
          "paymentInstructions.mobilePayments",
          [...current, mp.defaultValues],
          { shouldValidate: true }
        );
      }
    } else {
      setValue(
        "paymentInstructions.mobilePayments",
        current.filter((m) => m.provider !== provider),
        { shouldValidate: true }
      );
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Payment Instructions</h3>

      {/* Bank Payment Section */}
      <div className="space-y-2">
        <FormLabel>Bank Payment</FormLabel>

        <div className="space-y-2">
          {BANK_OPTIONS.map((bank) => {
            const isSelected =
              bankDetails?.bankName === bank.defaultValues.bankName;

            return (
              <div
                key={bank.id}
                className="flex items-start p-2 border rounded hover:bg-gray-50"
              >
                {/* Controlled Checkbox */}
                <Checkbox
                  checked={isSelected}
                  className="mt-1"
                  onCheckedChange={(checked) =>
                    handleBankSelection(bank, !!checked)
                  }
                />

                <div className="ml-2">
                  <p className="font-medium">{bank.title}</p>

                  {/* Selected Bank Preview */}
                  {isSelected && (
                    <ScrollArea className="mt-2 border-l pl-4 h-16 w-full text-sm text-gray-600">
                      <p>
                        Account: {bankDetails.accountName} /{" "}
                        {bankDetails.accountNumber}
                      </p>
                      <p>Routing: {bankDetails.routingNumber}</p>
                    </ScrollArea>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <FormMessage>
          {form.formState.errors.paymentInstructions?.bankDetails?.message}
        </FormMessage>
      </div>

      {/* Mobile Payments Section */}
      <FormField
        control={control}
        name="paymentInstructions.mobilePayments"
        render={() => (
          <FormItem>
            <FormLabel>Mobile Payments</FormLabel>

            <div className="space-y-2">
              {MOBILE_OPTIONS.map((mp) => {
                const isSelected = mobilePayments.some(
                  (m) => m.provider === mp.defaultValues.provider
                );

                return (
                  <div
                    key={mp.id}
                    className="flex items-start p-2 border rounded hover:bg-gray-50"
                  >
                    <Checkbox
                      checked={isSelected}
                      className="mt-1"
                      onCheckedChange={(checked) =>
                        handleMobileToggle(mp, !!checked)
                      }
                    />

                    <div className="ml-2">
                      <p className="font-medium">{mp.title}</p>

                      {isSelected && (
                        <ScrollArea className="mt-2 border-l pl-4 h-16 w-full text-sm text-gray-600">
                          <p>Number: {mp.defaultValues.number}</p>
                          <p>Instructions: {mp.defaultValues.instructions}</p>
                        </ScrollArea>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <FormMessage />
          </FormItem>
        )}
      />

      {/* Notes */}
      <FormField
        control={control}
        name="paymentInstructions.notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Notes (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="Any extra instructions" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
