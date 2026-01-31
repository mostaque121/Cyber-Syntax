import { CartProvider } from "@/contexts/cart-provider";
import { Suspense } from "react";
import { getAllProducts } from "./actions/product-actions";
import { CartDrawer } from "./components/cart-drawer/cart-drawer";
import Footer from "./components/layout/footer";
import Navbar from "./components/layout/navbar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const AllProducts = await getAllProducts();
  return (
    <CartProvider>
      <Suspense fallback={null}>
        <CartDrawer />
      </Suspense>

      <Navbar products={AllProducts ?? []} />
      {children}
      <Footer />
    </CartProvider>
  );
}
