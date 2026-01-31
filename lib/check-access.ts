import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Define the roles in your system
export type Role = "ADMIN" | "MODERATOR" | "CUSTOMER";

export type CheckAccessResult =
  | {
      ok: true;
      user: {
        id: string;
        email: string;
        name: string;
        role: Role;
        [key: string]: unknown;
      };
    }
  | { ok: false; error: string };

/**
 * Check if the current user has access based on allowed roles.
 * Use in server actions to protect routes.
 *
 * @param allowedRoles - Array of roles that are allowed to access
 * @returns Object with ok:true and user data, or ok:false and error message
 *
 * @example
 * // Allow only ADMIN
 * const access = await checkAccess(["ADMIN"]);
 *
 * @example
 * // Allow ADMIN and MODERATOR
 * const access = await checkAccess(["ADMIN", "MODERATOR"]);
 *
 * @example
 * // Usage in a server action
 * export async function deleteProduct(id: string) {
 *   const access = await checkAccess(["ADMIN"]);
 *   if (!access.ok) {
 *     return { error: access.error };
 *   }
 *   // proceed with deletion...
 *   console.log("Deleted by:", access.user.email);
 * }
 */
export async function checkAccess(
  allowedRoles: Role[],
): Promise<CheckAccessResult> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // Check if user is logged in
    if (!session?.user) {
      return { ok: false, error: "Unauthorized: Please log in to continue" };
    }

    const userRole = session.user.role as Role;

    // Check if user's role is in the allowed roles
    if (!allowedRoles.includes(userRole)) {
      return {
        ok: false,
        error: `Access denied: This action requires ${allowedRoles.join(" or ")} role`,
      };
    }

    return {
      ok: true,
      user: session.user as CheckAccessResult extends { ok: true }
        ? CheckAccessResult["user"]
        : never,
    };
  } catch (error) {
    console.error("checkAccess error:", error);
    return { ok: false, error: "Authentication error occurred" };
  }
}

/**
 * Check if user is authenticated (any role).
 * Use when you just need to verify the user is logged in.
 *
 * @example
 * const access = await checkAuth();
 * if (!access.ok) {
 *   return { error: access.error };
 * }
 */
export async function checkAuth(): Promise<CheckAccessResult> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { ok: false, error: "Unauthorized: Please log in to continue" };
    }

    return {
      ok: true,
      user: session.user as CheckAccessResult extends { ok: true }
        ? CheckAccessResult["user"]
        : never,
    };
  } catch (error) {
    console.error("checkAuth error:", error);
    return { ok: false, error: "Authentication error occurred" };
  }
}
