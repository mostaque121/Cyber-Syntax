import { CartProvider } from "@/contexts/cart-provider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { MessageSquareText } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllProducts } from "./actions/product-actions";
import { CartDrawer } from "./components/cart-drawer/cart-drawer";
import { GetServiceButton } from "./components/common/get-service-button";
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
      {/* Floating Get Service Button - visually distinct and user-friendly */}
      <div
        className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-1"
        style={{ pointerEvents: "none" }}
      >
        <span
          className="mb-1 mr-1 px-3 py-1 rounded-full bg-white/90 text-green-700 text-xs font-semibold shadow-md animate-fadeInUp select-none"
          style={{ pointerEvents: "auto" }}
        >
          Need Help?
        </span>
        <div style={{ pointerEvents: "auto" }}>
          <GetServiceButton
            buttonText={
              <MessageSquareText className="w-10 h-10 md:w-14 md:h-14 text-white drop-shadow-lg" />
            }
            buttonVariant="default"
            buttonClassName="rounded-full shadow-xl w-14 h-14 md:w-16 md:h-16 p-0 aspect-square bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center border-2 border-white animate-floatPulse hover:scale-110 transition-transform duration-200"
          />
        </div>
      </div>
      {GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
    </CartProvider>
  );
}
