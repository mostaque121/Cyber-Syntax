"use client";

import { addProductsToOrder } from "@/app/(dashboard)/actions/order.actions";
import type { OrderProductListFormData } from "@/app/(dashboard)/validations/order.validation";
import { orderProductListSchema } from "@/app/(dashboard)/validations/order.validation";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

interface ProductsTabProps {
  orderId: string;
  onSuccess: () => void;
  onCloseForm: () => void;
}

export default function AddProducts({
  orderId,
  onSuccess,
  onCloseForm,
}: ProductsTabProps) {
  const form = useForm<OrderProductListFormData>({
    resolver: zodResolver(orderProductListSchema),
    defaultValues: {
      products: [
        {
          productName: "",
          serialNumber: "",
          quantity: 1,
          price: 0,
          warranty: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const mutation = useMutation({
    mutationFn: (data: { items: OrderProductListFormData; orderId: string }) =>
      addProductsToOrder(data),
    onSuccess: () => {
      toast.success("Saved successfully");
      onSuccess();
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to save products");
    },
  });

  const addProduct = () => {
    append({
      productName: "",
      serialNumber: "",
      quantity: 1,
      price: 0,
      warranty: "",
    });
  };

  const onSubmit = (data: OrderProductListFormData) => {
    mutation.mutate({ items: data, orderId });
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {fields.length === 0 ? (
            <div className="border-dashed border p-6 flex flex-col items-center justify-center">
              <p className="text-muted-foreground mb-4">No product added yet</p>
              <Button variant="outline" type="button" onClick={addProduct}>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="border rounded p-4 space-y-4">
                  {/* Product Name & Serial Number */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`products.${index}.productName`}
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
                      name={`products.${index}.serialNumber`}
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

                  {/* Quantity & Price & Total */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name={`products.${index}.quantity`}
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
                      name={`products.${index}.price`}
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

                  {/* Warranty */}
                  <FormField
                    control={form.control}
                    name={`products.${index}.warranty`}
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

                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={addProduct}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Another Product
              </Button>
            </div>
          )}

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onCloseForm}>
              Cancel
            </Button>

            <LoadingButton type="submit" loading={mutation.isPending}>
              Add Product
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
