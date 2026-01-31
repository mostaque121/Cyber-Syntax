import { checkAccess } from "@/lib/check-access";
import { redirect } from "next/navigation";
import { UsersClient } from "./components/users-client";

export default async function UsersPage() {
  const access = await checkAccess(["ADMIN"]);

  if (!access.ok) {
    redirect("/login?error=unauthorized");
  }

  return <UsersClient />;
}
