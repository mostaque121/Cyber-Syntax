import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, ShieldCheck } from "lucide-react";

export function PaymentMethod() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Payment Method</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-4 bg-accent/10 border-2 border-accent rounded-lg">
          <div className="flex items-center gap-3">
            <CreditCard className="h-6 w-6 text-accent" />
            <div>
              <h3 className="font-semibold text-accent-foreground">
                Cash on Delivery
              </h3>
              <p className="text-sm text-muted-foreground">
                Pay when your order arrives at your doorstep
              </p>
            </div>
            <Badge variant="secondary" className="ml-auto">
              Selected
            </Badge>
          </div>
          <div className="mt-3 p-3 bg-background rounded border">
            <p className="text-sm text-muted-foreground">
              <ShieldCheck className="inline h-4 w-4 mr-1 text-accent" />
              Secure and convenient - no need to pay online. Our delivery
              partner will collect payment upon delivery.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
