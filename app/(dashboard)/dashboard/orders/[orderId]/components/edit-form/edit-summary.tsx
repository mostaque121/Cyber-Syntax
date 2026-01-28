"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateOrderSummary } from "@/app/(dashboard)/actions/order.actions";
import { OrderSummaryEditType } from "@/app/(dashboard)/types/order.types";
import {
  OrderSummaryFormData,
  orderSummarySchema,
} from "@/app/(dashboard)/validations/order.validation";
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

interface SummarySectionProps {
  orderId: string;
  orderSummary: OrderSummaryEditType;
  onSuccess: () => void;
  onCloseForm: () => void;
}

export default function EditOrderSummary({
  orderId,
  orderSummary,
  onSuccess,
  onCloseForm,
}: SummarySectionProps) {
  const form = useForm<OrderSummaryFormData>({
    resolver: zodResolver(orderSummarySchema),
    defaultValues: {
      discount: orderSummary.discount,
      shippingCost: orderSummary.shippingCost,
      productTax: orderSummary.productTax,
      serviceTax: orderSummary.serviceTax,
    },
  });

  const mutation = useMutation({
    mutationFn: (payload: { orderId: string; data: OrderSummaryFormData }) =>
      updateOrderSummary(payload.orderId, payload.data),
    onSuccess: () => {
      toast.success("Saved successfully");
      onSuccess();
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to save products");
    },
  });

  const onSubmit = (data: OrderSummaryFormData) => {
    mutation.mutate({ orderId, data });
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid items-start grid-cols-1 md:grid-cols-2 gap-4">
            {/* Discount */}
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount (%)</FormLabel>
                  <FormControl>
                    <NumberInput placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Shipping Cost */}
            <FormField
              control={form.control}
              name="shippingCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipping Cost</FormLabel>
                  <FormControl>
                    <NumberInput placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productTax"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product tax (%)</FormLabel>
                  <FormControl>
                    <NumberInput placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="serviceTax"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service tax (%)</FormLabel>
                  <FormControl>
                    <NumberInput placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onCloseForm}>
              Cancel
            </Button>

            <LoadingButton type="submit" loading={mutation.isPending}>
              Update Summary
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
