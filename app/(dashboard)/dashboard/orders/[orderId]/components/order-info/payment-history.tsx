import { PaymentHistoryProps } from "@/app/(dashboard)/types/order.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { calculateOrderTotal } from "@/lib/calculate-total";
import { formatPrice } from "@/lib/format-price";
import type { PaymentMethod } from "@/prisma/generated/prisma";
import {
  Banknote,
  CircleDollarSign,
  CreditCard,
  HelpCircle,
  Pencil,
  Plus,
  Smartphone,
} from "lucide-react";
import type React from "react";

const methodConfig: Record<
  PaymentMethod,
  { label: string; icon: React.ElementType }
> = {
  CASH: { label: "Cash", icon: Banknote },
  BANK_TRANSFER: { label: "Bank Transfer", icon: CreditCard },
  CARD: { label: "Card", icon: CreditCard },
  MOBILE_BANKING: { label: "Mobile Banking", icon: Smartphone },
  OTHER: { label: "Other", icon: HelpCircle },
};

interface SectionProps {
  data: PaymentHistoryProps;
  onAdd: () => void;
  onEdit: (id: string) => void;
}

export function PaymentHistory({ data, onAdd, onEdit }: SectionProps) {
  const total = calculateOrderTotal(data).finalTotal;
  const paidAmount = data.payments.reduce((sum, p) => sum + p.amount, 0);
  const remainingAmount = total - paidAmount;
  const progressPercent = (paidAmount / total) * 100;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <CircleDollarSign className="h-4 w-4" />
            Payment History
          </CardTitle>

          <Button
            size="sm"
            variant="outline"
            className="h-8 bg-transparent"
            onClick={onAdd}
          >
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Add Payment
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Payment Progress */}
        <div className="space-y-2 rounded-lg bg-muted/50 p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Payment Progress</span>
            <span className="font-medium">{progressPercent.toFixed(0)}%</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-emerald-600 font-medium">
              {formatPrice(paidAmount)}
            </span>
            <span className="text-muted-foreground">
              {formatPrice(remainingAmount)}
              remaining
            </span>
          </div>
        </div>

        {/* Payment List */}
        <div className="space-y-3">
          {data.payments.map((payment) => {
            const config = methodConfig[payment.method];
            const Icon = config.icon;
            return (
              <div
                key={payment.id}
                className="flex items-center gap-3 rounded-lg border p-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                  <Icon className="h-5 w-5 text-emerald-600" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{formatPrice(payment.amount)}</p>
                    <Badge variant="outline" className="text-xs">
                      {config.label}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-6 justify-between mt-0.5">
                    <p className="text-xs text-nowrap text-muted-foreground">
                      {payment.date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    {payment.note && (
                      <p className="text-xs  text-muted-foreground">
                        {payment.note}
                      </p>
                    )}
                  </div>
                </div>

                {/* EDIT BUTTON */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onEdit(payment.id)}
                >
                  <Pencil className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
