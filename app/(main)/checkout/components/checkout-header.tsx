import { ShieldCheck, Truck } from "lucide-react";

export function CheckoutHeader() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">SecureShop</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-accent" />
              <span>Secure Checkout</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Truck className="h-4 w-4 text-accent" />
              <span>Free Returns</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
