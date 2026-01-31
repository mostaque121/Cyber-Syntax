export const dynamic = "force-dynamic";
import { checkAccess } from "@/lib/check-access";
import { redirect } from "next/navigation";
import { ContactSubmissionsClient } from "./components/contact-submissions-client";

export default async function ContactSubmissionsPage() {
  const access = await checkAccess(["ADMIN", "MODERATOR"]);

  if (!access.ok) {
    redirect("/login?error=unauthorized");
  }

  return <ContactSubmissionsClient />;
}
