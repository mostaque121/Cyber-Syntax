"use client";

import { useMutation } from "@tanstack/react-query";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  CheckCircle,
  Clock,
  Loader2,
  Package,
  RotateCcw,
  Settings,
  Truck,
  XCircle,
} from "lucide-react";

import { updateOrderStatus } from "@/app/(dashboard)/actions/order.actions";
import { LoadingButton } from "@/components/custom-ui/loading-button";
import { OrderStatus } from "@/prisma/generated/prisma";

interface OrderActionsProps {
  order: {
    orderId: string;
    status: OrderStatus;
  };
  onSuccess: () => void;
}

const statusOptions: {
  value: OrderStatus;
  label: string;
  icon: React.ElementType;
}[] = [
  { value: "PENDING", label: "Pending", icon: Clock },
  { value: "CONFIRMED", label: "Confirmed", icon: CheckCircle },
  { value: "PROCESSING", label: "Processing", icon: Loader2 },
  { value: "SHIPPED", label: "Shipped", icon: Truck },
  { value: "DELIVERED", label: "Delivered", icon: Package },
  { value: "RETURNED", label: "Returned", icon: RotateCcw },
  { value: "CANCELLED", label: "Cancelled", icon: XCircle },
];

export function OrderActions({ order, onSuccess }: OrderActionsProps) {
  const [status, setStatus] = useState(order.status);

  const mutation = useMutation({
    mutationFn: (newStatus: OrderStatus) =>
      updateOrderStatus(order.orderId, newStatus),
    onMutate: async (newStatus) => {
      setStatus(newStatus);
    },
    onSuccess: () => {
      toast.success("Order status updated");
      onSuccess();
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to update status");
      setStatus(order.status); //
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Settings className="h-4 w-4" />
          Manage Order
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Update Status</label>

          <Select
            value={status}
            disabled={mutation.isPending}
            onValueChange={(val) => setStatus(val as OrderStatus)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {statusOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {option.label}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <div>
          <LoadingButton
            disabled={status === order.status}
            onClick={() => mutation.mutate(status)}
            loading={mutation.isPending}
            loadingText="Saving..."
          >
            Save Changes
          </LoadingButton>
        </div>
      </CardContent>
    </Card>
  );
}
