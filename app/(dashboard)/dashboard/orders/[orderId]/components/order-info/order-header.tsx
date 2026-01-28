"use client";
import { deleteOrder } from "@/app/(dashboard)/actions/order.actions";
import { DeleteDialog } from "@/components/custom-ui/delete-dialog";
import { LoadingButton } from "@/components/custom-ui/loading-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { OrderStatus, OrderType } from "@/prisma/generated/prisma";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, Copy, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface OrderHeaderProps {
  order: {
    orderId: string;
    orderType: OrderType;
    status: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
  };
}

const statusColors: Record<OrderStatus, string> = {
  PENDING: "bg-amber-100 text-amber-800 border-amber-200",
  CONFIRMED: "bg-blue-100 text-blue-800 border-blue-200",
  CANCELLED: "bg-red-100 text-red-800 border-red-200",
  PROCESSING: "bg-indigo-100 text-indigo-800 border-indigo-200",
  SHIPPED: "bg-cyan-100 text-cyan-800 border-cyan-200",
  DELIVERED: "bg-emerald-100 text-emerald-800 border-emerald-200",
  RETURNED: "bg-rose-100 text-rose-800 border-rose-200",
};

export function OrderHeader({ order }: OrderHeaderProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const deleteMutation = useMutation({
    mutationFn: (data: { orderId: string }) => deleteOrder(data),
    onSuccess: () => {
      toast.success("Deleted successfully");
      router.push("/dashboard/orders");
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to delete order");
    },
  });

  const onDelete = () => {
    deleteMutation.mutate({ orderId: order.orderId });
  };
  const statusStyle = statusColors[order.status];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(order.orderId);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 10000);
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-background p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/orders">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 shrink-0 bg-transparent"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {order.orderId}
            </h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              className={cn(
                "h-7 w-7 transition-colors",
                copied &&
                  "bg-green-500/15 text-green-600 border border-green-500"
              )}
            >
              <Copy className="h-3.5 w-3.5" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            {order.createdAt.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <Badge className={statusStyle}>{order.status}</Badge>

        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 bg-transparent"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DeleteDialog
              title={`Delete ${order.orderId}?`}
              description={`Are you sure you want to permanently delete ${order.orderId.toLowerCase()}? This action cannot be undone.`}
              onConfirm={onDelete}
            >
              <LoadingButton
                variant="destructive"
                loading={deleteMutation.isPending}
              >
                Delete Order
              </LoadingButton>
            </DeleteDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
