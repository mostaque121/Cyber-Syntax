import { CartProvider } from "@/contexts/cart-provider";
import { Suspense } from "react";
import { CartDrawer } from "./components/cart-drawer/cart-drawer";
import Footer from "./components/layout/footer";
import NextHandNavbar from "./components/layout/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <Suspense fallback={null}>
        <CartDrawer />
      </Suspense>

      <NextHandNavbar />
      {children}
      <Footer />
    </CartProvider>
  );
}
