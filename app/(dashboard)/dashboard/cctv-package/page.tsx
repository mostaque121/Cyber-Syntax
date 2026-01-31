import { checkAccess } from "@/lib/check-access";
import { redirect } from "next/navigation";
import { CctvPackageClient } from "./components/cctv-package-client";

export default async function CctvPackagePage() {
  const access = await checkAccess(["ADMIN", "MODERATOR"]);

  if (!access.ok) {
    redirect("/login?error=unauthorized");
  }

  return <CctvPackageClient />;
}
