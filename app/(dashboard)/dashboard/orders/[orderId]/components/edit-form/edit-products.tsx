"use client";

import {
  deleteProductFromOrder,
  editProductOnOrder,
} from "@/app/(dashboard)/actions/order.actions";
import type { OrderProductFormData } from "@/app/(dashboard)/validations/order.validation";
import { orderProductSchema } from "@/app/(dashboard)/validations/order.validation";
import { DeleteDialog } from "@/components/custom-ui/delete-dialog";
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
import { ProductOrder } from "@/prisma/generated/prisma";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ProductFormProps {
  initialItem: ProductOrder;
  onSuccess: () => void;
  onCloseForm: () => void;
}

export default function EditProduct({
  onSuccess,
  onCloseForm,
  initialItem,
}: ProductFormProps) {
  const form = useForm<OrderProductFormData>({
    resolver: zodResolver(orderProductSchema),
    defaultValues: {
      productName: initialItem.productName,
      serialNumber: initialItem.serialNumber || "",
      quantity: initialItem.quantity,
      price: initialItem.price,
      warranty: initialItem.warranty || "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: {
      item: OrderProductFormData;
      productOrderId: string;
    }) => editProductOnOrder(data),
    onSuccess: () => {
      toast.success("Saved successfully");
      onSuccess();
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to save product");
    },
  });
  const deleteMutation = useMutation({
    mutationFn: (data: { productOrderId: string }) =>
      deleteProductFromOrder(data),
    onSuccess: () => {
      toast.success("Deleted successfully");
      onSuccess();
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to delete product");
    },
  });

  const onSubmit = (data: OrderProductFormData) => {
    mutation.mutate({ item: data, productOrderId: initialItem.id });
  };
  const onDelete = () => {
    deleteMutation.mutate({ productOrderId: initialItem.id });
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="border rounded p-4 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="iPhone 15 Pro" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="serialNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Serial Number</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="SN12345" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <NumberInput {...field} value={field.value ?? 1} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <NumberInput {...field} value={field.value ?? 0} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="warranty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Warranty</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="12 Months" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-between gap-4">
            <DeleteDialog
              title={`Delete ${initialItem.productName}?`}
              description={`Are you sure you want to permanently delete ${initialItem.productName.toLowerCase()}? This action cannot be undone.`}
              onConfirm={onDelete}
            >
              <LoadingButton
                variant="destructive"
                loading={deleteMutation.isPending}
              >
                Delete Product
              </LoadingButton>
            </DeleteDialog>

            <div className="flex items-center gap-4">
              <Button type="button" variant="outline" onClick={onCloseForm}>
                Cancel
              </Button>
              <LoadingButton type="submit" loading={mutation.isPending}>
                Save Product
              </LoadingButton>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
