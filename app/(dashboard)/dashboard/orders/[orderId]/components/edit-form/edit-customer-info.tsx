"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateOrderCustomerInfo } from "@/app/(dashboard)/actions/order.actions";
import type { OrderCustomerInfo } from "@/app/(dashboard)/types/order.types";
import {
  CustomerInfoFormData,
  customerInfoSchema,
} from "@/app/(dashboard)/validations/order.validation";

import { LoadingButton } from "@/components/custom-ui/loading-button";
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
import { Textarea } from "@/components/ui/textarea";

interface CustomerInfoSectionProps {
  orderId: string;
  customer: OrderCustomerInfo;
  onSuccess: () => void;
  onCloseForm: () => void;
}

export default function EditProductOrderCustomer({
  orderId,
  customer,
  onSuccess,
  onCloseForm,
}: CustomerInfoSectionProps) {
  const form = useForm<CustomerInfoFormData>({
    resolver: zodResolver(customerInfoSchema),
    defaultValues: {
      customerName: customer.customerName,
      companyName: customer.companyName || "",
      emailAddress: customer.emailAddress,
      phoneNumber: customer.phoneNumber || "",
      whatsappNumber: customer.whatsappNumber || "",
      fullAddress: customer.fullAddress || "",
    },
  });

  const mutation = useMutation({
    mutationFn: (payload: { orderId: string; data: CustomerInfoFormData }) =>
      updateOrderCustomerInfo(payload.orderId, payload.data),
    onSuccess: () => {
      toast.success("Customer info updated successfully");
      onSuccess();
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to update customer info");
    },
  });

  const onSubmit = (data: CustomerInfoFormData) => {
    mutation.mutate({ orderId, data });
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 items-start md:grid-cols-2 gap-4">
            {/* Customer Name */}
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Address */}
            <FormField
              control={form.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Number */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+880123456789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* WhatsApp Number */}
            <FormField
              control={form.control}
              name="whatsappNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+880123456789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Company Name */}
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="ITEC.." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Full Address */}
          <FormField
            control={form.control}
            name="fullAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="Street, City, Country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onCloseForm}>
              Cancel
            </Button>

            <LoadingButton type="submit" loading={mutation.isPending}>
              Update Customer
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
