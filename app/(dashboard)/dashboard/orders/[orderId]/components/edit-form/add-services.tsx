"use client";

import { addServicesToOrder } from "@/app/(dashboard)/actions/order.actions";
import type { OrderServiceListFormData } from "@/app/(dashboard)/validations/order.validation";
import { orderServiceListSchema } from "@/app/(dashboard)/validations/order.validation";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

interface ServicesTabProps {
  orderId: string;
  onSuccess: () => void;
  onCloseForm: () => void;
}

export default function AddServices({
  orderId,
  onSuccess,
  onCloseForm,
}: ServicesTabProps) {
  const form = useForm<OrderServiceListFormData>({
    resolver: zodResolver(orderServiceListSchema),
    defaultValues: {
      services: [
        {
          name: "",
          serviceType: undefined,
          price: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "services",
  });

  const mutation = useMutation({
    mutationFn: (data: { items: OrderServiceListFormData; orderId: string }) =>
      addServicesToOrder(data),
    onSuccess: () => {
      toast.success("Saved successfully");
      onSuccess();
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to save services");
    },
  });

  const addService = () => {
    append({
      name: "",
      serviceType: "IT_SUPPORT",
      price: 0,
    });
  };

  const onSubmit = (data: OrderServiceListFormData) => {
    mutation.mutate({ items: data, orderId });
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {fields.length === 0 ? (
            <div className="border-dashed border p-6 flex flex-col items-center justify-center">
              <p className="text-muted-foreground mb-4">No service added yet</p>
              <Button variant="outline" type="button" onClick={addService}>
                <Plus className="mr-2 h-4 w-4" />
                Add Service
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="border rounded p-4 space-y-4">
                  <FormField
                    control={form.control}
                    name={`services.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="It solution" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Quantity & Price & Total */}
                  <div className="grid items-start md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`services.${index}.serviceType`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Type</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Service Type" />
                              </SelectTrigger>

                              <SelectContent>
                                <SelectItem value="IT_SUPPORT">
                                  IT Support
                                </SelectItem>
                                <SelectItem value="CCTV_SOLUTION">
                                  CCTV Solution
                                </SelectItem>
                                <SelectItem value="NETWORKING_SOLUTION">
                                  Networking Solution
                                </SelectItem>
                                <SelectItem value="SOFTWARE_DEVELOPMENT">
                                  Software Development
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`services.${index}.price`}
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
                onClick={addService}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Another Service
              </Button>
            </div>
          )}

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onCloseForm}>
              Cancel
            </Button>

            <LoadingButton type="submit" loading={mutation.isPending}>
              Add Service
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
