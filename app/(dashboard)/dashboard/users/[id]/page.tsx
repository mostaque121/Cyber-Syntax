import { checkAccess } from "@/lib/check-access";
import { redirect } from "next/navigation";
import { UserDetailClient } from "./components/user-detail-client";

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const access = await checkAccess(["ADMIN"]);

  if (!access.ok) {
    redirect("/login?error=unauthorized");
  }

  const { id } = await params;

  return <UserDetailClient userId={id} />;
}
