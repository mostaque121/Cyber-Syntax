import { checkAccess } from "@/lib/check-access";
import { redirect } from "next/navigation";
import { ProductClient } from "./components/product-client";

export default async function ProductPage() {
  const access = await checkAccess(["ADMIN", "MODERATOR"]);

  if (!access.ok) {
    redirect("/login?error=unauthorized");
  }

  return <ProductClient />;
}
