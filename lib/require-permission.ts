// lib/auth/requirePermission.ts
import { auth } from "@/lib/auth";
import { AppAction, checkPermission } from "@/lib/permissions";
import { headers } from "next/headers";

export type PermissionResult<UserType> =
  | { ok: true; user: UserType }
  | { ok: false; error: string };

/**
 * Checks session and permission for a server component.
 * @param action Action to check permission for
 * @returns Either {ok:true, user} or {ok:false, error}
 */
export async function requirePermission(action: AppAction) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { ok: false, error: "Unauthorized: no session" };
  }

  const userRole = session.user.role;

  const can = checkPermission(userRole, action);

  if (!can.ok) {
    return { ok: false, error: can.error };
  }

  return { ok: true, user: session.user };
}
