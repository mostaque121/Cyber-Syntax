import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: {
    default: "Account",
    template: "%s | Cyber Syntax",
  },
  description:
    "Cyber Syntax account management - Sign in, sign up, and manage your account.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
