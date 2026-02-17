import { auth } from "@/lib/auth";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ProfileClient } from "./components/profile-client";

export const metadata: Metadata = {
  title: "My Profile",
  description:
    "Manage your Cyber Syntax account, view orders, and update your profile settings.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  return <ProfileClient />;
}
