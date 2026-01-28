import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, ShieldCheck, Truck } from "lucide-react";

export function TrustIndicators() {
  return (
    <Card className="bg-muted/50">
      <CardContent className="pt-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <ShieldCheck className="h-8 w-8 text-accent mx-auto" />
            <p className="text-sm font-medium">Secure</p>
            <p className="text-xs text-muted-foreground">Safe & Protected</p>
          </div>
          <div className="space-y-2">
            <Truck className="h-8 w-8 text-accent mx-auto" />
            <p className="text-sm font-medium">Fast Delivery</p>
            <p className="text-xs text-muted-foreground">2-3 Business Days</p>
          </div>
          <div className="space-y-2">
            <CreditCard className="h-8 w-8 text-accent mx-auto" />
            <p className="text-sm font-medium">Pay on Delivery</p>
            <p className="text-xs text-muted-foreground">Cash or Card</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
