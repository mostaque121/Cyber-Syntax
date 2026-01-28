"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  deleteServiceFromOrder,
  editServiceOnOrder,
} from "@/app/(dashboard)/actions/order.actions";
import type { OrderServiceFormData } from "@/app/(dashboard)/validations/order.validation";
import { orderServiceSchema } from "@/app/(dashboard)/validations/order.validation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ServiceOrder } from "@/prisma/generated/prisma";

interface ServicesTabProps {
  initialItem: ServiceOrder;
  onSuccess: () => void;
  onCloseForm: () => void;
}

export default function EditService({
  initialItem,
  onSuccess,
  onCloseForm,
}: ServicesTabProps) {
  const form = useForm<OrderServiceFormData>({
    resolver: zodResolver(orderServiceSchema),
    defaultValues: {
      name: initialItem.name,
      serviceType: initialItem.serviceType,
      price: initialItem.price,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: {
      item: OrderServiceFormData;
      serviceOrderId: string;
    }) => editServiceOnOrder(data),
    onSuccess: () => {
      toast.success("Saved successfully");
      onSuccess();
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to save service");
    },
  });

  const onSubmit = (data: OrderServiceFormData) => {
    mutation.mutate({ item: data, serviceOrderId: initialItem.id });
  };

  const deleteMutation = useMutation({
    mutationFn: (data: { serviceOrderId: string }) =>
      deleteServiceFromOrder(data),
    onSuccess: () => {
      toast.success("Deleted successfully");
      onSuccess();
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to delete service");
    },
  });

  const onDelete = () => {
    deleteMutation.mutate({ serviceOrderId: initialItem.id });
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
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
              name="serviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Type</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Service Type" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="IT_SUPPORT">IT Support</SelectItem>
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

          <div className="flex justify-between gap-4">
            <DeleteDialog
              title={`Delete ${initialItem.name}?`}
              description={`Are you sure you want to permanently delete ${initialItem.name.toLowerCase()}? This action cannot be undone.`}
              onConfirm={onDelete}
            >
              <LoadingButton
                variant="destructive"
                loading={deleteMutation.isPending}
              >
                Delete Service
              </LoadingButton>
            </DeleteDialog>
            <div className="flex items-center gap-4 ">
              <Button type="button" variant="outline" onClick={onCloseForm}>
                Cancel
              </Button>

              <LoadingButton type="submit" loading={mutation.isPending}>
                Add Service
              </LoadingButton>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
