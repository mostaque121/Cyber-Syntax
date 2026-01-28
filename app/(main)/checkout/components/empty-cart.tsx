import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

export function EmptyCart() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6 text-center space-y-4">
          <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto" />
          <h2 className="text-2xl font-bold text-foreground">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground">
            Add some products to your cart to proceed with checkout
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
