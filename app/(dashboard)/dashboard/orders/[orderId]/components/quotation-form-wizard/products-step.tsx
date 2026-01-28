"use client";

import { NumberInput } from "@/components/custom-ui/number-input";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Plus, Trash } from "lucide-react";

import { QuotationFormData } from "@/app/(dashboard)/validations/quotation.validation";
import { useFieldArray, type UseFormReturn } from "react-hook-form";

interface ProductsStepProps {
  form: UseFormReturn<QuotationFormData>;
}

export function ProductsStep({ form }: ProductsStepProps) {
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "orderProducts",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Products</h3>
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({
              productName: "",
              serialNumber: "",
              quantity: 1,
              price: 0,
              warranty: "",
            })
          }
        >
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </Button>
      </div>

      <div className="space-y-8">
        {fields.map((item, index) => (
          <div key={item.id} className="p-4 border rounded-lg space-y-4">
            <div className="grid grid-cols-1 items-start md:grid-cols-2 gap-4 ">
              {/* Name */}
              <FormField
                control={control}
                name={`orderProducts.${index}.productName`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Product title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Serial Number */}
              <FormField
                control={control}
                name={`orderProducts.${index}.serialNumber`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Serial Number</FormLabel>
                    <FormControl>
                      <Input placeholder="SN / IMEI / etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 items-start grid-cols-1 md:grid-cols-3">
              {/* Qty */}
              <FormField
                control={control}
                name={`orderProducts.${index}.quantity`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <NumberInput {...field} min={1} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price */}
              <FormField
                control={control}
                name={`orderProducts.${index}.price`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <NumberInput {...field} min={0} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Warranty */}
              <FormField
                control={control}
                name={`orderProducts.${index}.warranty`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Warranty (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 6 months"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Remove Button */}
            <div className="flex items-center">
              <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
