import { CategoryProvider } from "@/contexts/category-provider";
import { QueryProvider } from "@/contexts/query-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Flex } from "next/font/google";
import "react-quill-new/dist/quill.snow.css";
import { Toaster } from "sonner";
import { getAllCategories } from "./actions/category-actions";
import "./globals.css";
// Load Geist
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Load Roboto Flex
const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-roboto-flex",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cybersyntax.com.bd"),
  title: {
    default: "Cyber Syntax",
    template: "%s | Cyber Syntax",
  },
  description:
    "Cyber Syntax - Your trusted IT solutions partner in Bangladesh. We offer professional CCTV installation, IT support, software development, networking solutions, and quality tech products at competitive prices.",
  keywords: [
    "CCTV installation",
    "IT support",
    "software development",
    "networking solutions",
    "tech products",
    "Bangladesh",
    "Dhaka",
    "IT solutions",
    "security cameras",
    "computer services",
  ],
  authors: [{ name: "Cyber Syntax" }],
  openGraph: {
    title: "Cyber Syntax - IT Solutions & Tech Products",
    description:
      "Professional CCTV installation, IT support, software development, networking solutions, and quality tech products in Bangladesh.",
    type: "website",
    locale: "en_BD",
    siteName: "Cyber Syntax",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cyber Syntax - IT Solutions & Tech Products",
    description:
      "Professional CCTV installation, IT support, software development, networking solutions, and quality tech products in Bangladesh.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getAllCategories();
  return (
    <QueryProvider>
      <html lang="en">
        <body
          className={`${robotoFlex.variable}  ${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <CategoryProvider initialCategory={data ?? []}>
            {children}
          </CategoryProvider>

          <Toaster />
        </body>
      </html>
    </QueryProvider>
  );
}
