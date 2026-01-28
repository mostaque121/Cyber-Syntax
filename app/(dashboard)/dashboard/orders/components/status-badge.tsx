import { cn } from "@/lib/utils";
import { OrderStatus } from "@/prisma/generated/prisma";

interface StatusBadgeProps {
  status: OrderStatus;
  size?: "sm" | "md";
}

const orderStatusConfig: Record<
  OrderStatus,
  { label: string; className: string }
> = {
  PENDING: {
    label: "Pending",
    className: "bg-warning/15 text-warning-foreground border-warning/30",
  },
  CONFIRMED: {
    label: "Confirmed",
    className: "bg-primary/15 text-primary border-primary/30",
  },
  PROCESSING: {
    label: "Processing",
    className: "bg-primary/15 text-primary border-primary/30",
  },
  SHIPPED: {
    label: "Shipped",
    className: "bg-chart-2/15 text-chart-2 border-chart-2/30",
  },
  DELIVERED: {
    label: "Delivered",
    className: "bg-success/15 text-success border-success/30",
  },
  CANCELLED: {
    label: "Cancelled",
    className: "bg-destructive/15 text-destructive border-destructive/30",
  },
  RETURNED: {
    label: "Returned",
    className: "bg-yellow-100 text-destructive border-destructive/30",
  },
};

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const config = orderStatusConfig[status as OrderStatus];

  if (!config) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
        config.className
      )}
    >
      {config.label}
    </span>
  );
}
