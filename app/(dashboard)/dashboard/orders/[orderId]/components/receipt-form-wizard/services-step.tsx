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

import { ReceiptFormData } from "@/app/(dashboard)/validations/receipt.validation";
import { Plus, Trash } from "lucide-react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";

interface ServicesStepProps {
  form: UseFormReturn<ReceiptFormData>;
}

export function ServicesStep({ form }: ServicesStepProps) {
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "orderServices",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Services</h3>
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({
              name: "",
              price: 0,
            })
          }
        >
          <Plus className="w-4 h-4 mr-2" /> Add Service
        </Button>
      </div>

      <div className="space-y-8">
        {fields.map((item, index) => (
          <div
            key={item.id}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg"
          >
            {/* Service Name */}
            <FormField
              control={control}
              name={`orderServices.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Service title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price */}
            <FormField
              control={control}
              name={`orderServices.${index}.price`}
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

            {/* Remove Button */}
            <div className="flex items-end">
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
