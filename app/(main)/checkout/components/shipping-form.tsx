"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { authClient } from "@/lib/auth-client";
import { formatPrice } from "@/lib/format-price";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Phone, User } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  CheckoutFormData,
  checkoutFormSchema,
} from "../../validation/checkout.validation";

interface ShippingFormProps {
  selectedItemsCount: number;
  total: number;
  onSubmit: (data: CheckoutFormData) => void;
  onShippingChange: (isInside: boolean) => void;
  isLoading: boolean;
}

export function ShippingForm({
  selectedItemsCount,
  total,
  onSubmit,
  onShippingChange,
  isLoading,
}: ShippingFormProps) {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: user?.name || "",
      companyName: user?.companyName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      whatsappNumber: user?.whatsappNumber || "",
      fullAddress: user?.fullAddress || "",
      isInsideDhaka: "inside", // default
    },
  });

  // ✅ trigger parent immediately when user changes radio
  const handleShippingChange = (value: "inside" | "outside") => {
    form.setValue("isInsideDhaka", value, { shouldValidate: true });
    onShippingChange(value === "inside");
  };

  const handleSubmit = (data: CheckoutFormData) => {
    onSubmit(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Shipping Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {/* Full Name */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-input" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Company Name */}
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-input" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="email" className="bg-input" />
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
                  <FormLabel className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" className="bg-input" />
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
                  <FormLabel>WhatsApp Number (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" className="bg-input" />
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
                  <FormLabel className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Full Address
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Street, City, State, ZIP"
                      className="resize-none bg-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Inside Dhaka or Outside */}
            <FormField
              control={form.control}
              name="isInsideDhaka"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipping Location</FormLabel>
                  <FormControl>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="inside"
                          checked={field.value === "inside"}
                          onChange={() => handleShippingChange("inside")}
                        />
                        Inside Dhaka (৳ 50)
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="outside"
                          checked={field.value === "outside"}
                          onChange={() => handleShippingChange("outside")}
                        />
                        Outside Dhaka (৳ 100)
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={selectedItemsCount === 0 || isLoading}
                className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="w-5 h-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : selectedItemsCount === 0 ? (
                  "Select items to continue"
                ) : (
                  `Confirm Order - ${formatPrice(total)}`
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-2">
                By placing this order, you agree to our terms and conditions
              </p>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
