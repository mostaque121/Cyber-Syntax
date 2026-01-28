"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  deletePayment,
  editPaymentOnOrder,
} from "@/app/(dashboard)/actions/payment-actions";

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
import { DeleteDialog } from "@/components/custom-ui/delete-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Payment } from "@/prisma/generated/prisma";

interface EditPaymentProps {
  initialData: Payment;
  onSuccess: () => void;
  onCloseForm: () => void;
}

export default function EditPayment({
  initialData,
  onSuccess,
  onCloseForm,
}: EditPaymentProps) {
  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      method: initialData.method,
      amount: initialData.amount,
      note: initialData.note || "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: { paymentId: string; data: PaymentFormData }) =>
      editPaymentOnOrder(data),

    onSuccess: () => {
      toast.success("Payment updated successfully");
      onSuccess();
    },

    onError: () => {
      toast.error("Failed to update payment");
    },
  });

  const onSubmit = (data: PaymentFormData) => {
    mutation.mutate({ paymentId: initialData.id, data });
  };

  const deleteMutation = useMutation({
    mutationFn: (data: { paymentId: string }) => deletePayment(data),
    onSuccess: () => {
      toast.success("Deleted successfully");
      onSuccess();
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to delete payment");
    },
  });

  const onDelete = () => {
    deleteMutation.mutate({ paymentId: initialData.id });
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            {/* Amount */}
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
                <FormLabel>Note</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Optional note..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between gap-4">
            <DeleteDialog
              title={`Delete ${initialData.method}?`}
              description={`Are you sure you want to permanently delete ${initialData.method.toLowerCase()}? This action cannot be undone.`}
              onConfirm={onDelete}
            >
              <LoadingButton
                variant="destructive"
                loading={deleteMutation.isPending}
              >
                Delete Payment
              </LoadingButton>
            </DeleteDialog>
            <div className="flex items-center gap-4 ">
              <Button type="button" variant="outline" onClick={onCloseForm}>
                Cancel
              </Button>

              <LoadingButton loading={mutation.isPending} type="submit">
                Save Changes
              </LoadingButton>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
