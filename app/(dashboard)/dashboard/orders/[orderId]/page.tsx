export const dynamic = "force-dynamic";
import { checkAccess } from "@/lib/check-access";
import { redirect } from "next/navigation";
import { OrderDetailsClient } from "./components/order-details-client";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const access = await checkAccess(["ADMIN", "MODERATOR"]);

  if (!access.ok) {
    redirect("/login?error=unauthorized");
  }

  const { orderId } = await params;

  return <OrderDetailsClient orderId={orderId} />;
}
