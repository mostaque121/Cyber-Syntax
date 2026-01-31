export const dynamic = "force-dynamic";
import { checkAccess } from "@/lib/check-access";
import { redirect } from "next/navigation";
import { OrderClient } from "./components/order-client";

export default async function OrderPage() {
  const access = await checkAccess(["ADMIN", "MODERATOR"]);

  if (!access.ok) {
    redirect("/login?error=unauthorized");
  }

  return <OrderClient />;
}
