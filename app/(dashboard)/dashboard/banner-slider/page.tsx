export const dynamic = "force-dynamic";
import { checkAccess } from "@/lib/check-access";
import { redirect } from "next/navigation";
import { BannerSliderClient } from "./components/banner-slider-client";

export default async function DashboardBannerSliderPage() {
  const access = await checkAccess(["ADMIN", "MODERATOR"]);

  if (!access.ok) {
    redirect("/login?error=unauthorized");
  }
  return <BannerSliderClient />;
}
