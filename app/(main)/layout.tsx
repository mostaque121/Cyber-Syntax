import { CartProvider } from "@/contexts/cart-provider";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllProducts } from "./actions/product-actions";
import { CartDrawer } from "./components/cart-drawer/cart-drawer";
import Footer from "./components/layout/footer";
import Navbar from "./components/layout/navbar";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://cybersyntax.com.bd";
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Cyber Syntax",
    template: "%s | Cyber Syntax",
  },
  authors: [{ name: "Cyber Syntax", url: baseUrl }],
  creator: "Cyber Syntax",
  publisher: "Cyber Syntax",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    locale: "en_BD",
    siteName: "Cyber Syntax",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@cybersyntax",
    site: "@cybersyntax",
  },
  category: "technology",
};

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

      <Suspense>
        <Navbar products={AllProducts ?? []} />
      </Suspense>

      {children}
      <Footer />
      {GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
    </CartProvider>
  );
}
