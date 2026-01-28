"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { editOrderCost } from "@/app/(dashboard)/actions/order.actions";
import {
  OrderCostFormData,
  orderCostSchema,
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

interface OrderCost {
  productCost: number | null;
  serviceCost: number | null;
  transportCost: number | null;
}
interface SummarySectionProps {
  orderId: string;
  orderCost: OrderCost;
  onSuccess: () => void;
  onCloseForm: () => void;
}

export default function EditProductOrderCostManagement({
  orderId,
  orderCost,
  onSuccess,
  onCloseForm,
}: SummarySectionProps) {
  const form = useForm<OrderCostFormData>({
    resolver: zodResolver(orderCostSchema),
    defaultValues: {
      productCost: orderCost.productCost || 0,
      serviceCost: orderCost.serviceCost || 0,
      transportCost: orderCost.transportCost || 0,
    },
  });

  const mutation = useMutation({
    mutationFn: (payload: { orderId: string; data: OrderCostFormData }) =>
      editOrderCost(payload.orderId, payload.data),
    onSuccess: () => {
      toast.success("Saved successfully");
      onSuccess();
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to edit cost");
    },
  });

  const onSubmit = (data: OrderCostFormData) => {
    mutation.mutate({ orderId, data });
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Product Cost */}
            <FormField
              control={form.control}
              name="productCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Cost</FormLabel>
                  <FormControl>
                    <NumberInput placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Service Cost */}
            <FormField
              control={form.control}
              name="serviceCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Cost</FormLabel>
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
              name="transportCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transport Cost</FormLabel>
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
              Update Cost
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
