"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { addPaymentToOrder } from "@/app/(dashboard)/actions/payment-actions";

import { LoadingButton } from "@/components/custom-ui/loading-button";
import { NumberInput } from "@/components/custom-ui/number-input";
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

import {
  PaymentFormData,
  paymentSchema,
} from "@/app/(dashboard)/validations/order.validation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddPaymentProps {
  orderId: string;
  onSuccess: () => void;
  onCloseForm: () => void;
}

export default function AddPayment({
  orderId,
  onSuccess,
  onCloseForm,
}: AddPaymentProps) {
  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      amount: 0,
      method: "CASH",
      note: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: { orderId: string; data: PaymentFormData }) =>
      addPaymentToOrder(data),
    onSuccess: () => {
      toast.success("Payment added successfully");
      onSuccess();
    },
    onError: () => {
      toast.error("Failed to add payment");
    },
  });

  const onSubmit = (data: PaymentFormData) => {
    mutation.mutate({ orderId, data });
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Amount */}
          <div className="grid grid-cols-1 gap-4 items-start md:grid-cols-2">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <NumberInput {...field} value={field.value ?? 0} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Payment Method */}
            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="CASH">Cash</SelectItem>
                      <SelectItem value="BANK_TRANSFER">
                        Bank Transfer
                      </SelectItem>
                      <SelectItem value="CARD">Card</SelectItem>
                      <SelectItem value="MOBILE_BANKING">
                        Mobile Banking
                      </SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Note */}
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Note (optional)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Any note…" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onCloseForm}>
              Cancel
            </Button>

            <LoadingButton type="submit" loading={mutation.isPending}>
              Add Payment
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
