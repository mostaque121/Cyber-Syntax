// lib/permissions.ts

// Roles in your system
export type Role = "ADMIN" | "MODERATOR" | "CUSTOMER";

// Actions that can be performed
export enum AppAction {
  CREATE_PRODUCT = "CREATE_PRODUCT",
  UPDATE_PRODUCT = "UPDATE_PRODUCT",
  DELETE_PRODUCT = "DELETE_PRODUCT",
  VIEW_DASHBOARD = "VIEW_DASHBOARD",
  MANAGE_USERS = "MANAGE_USERS",
}

// Permission rules for each role
export type PermissionRule = {
  role: Role;
  actions: AppAction[];
};

// The permission map (like CASL abilities)
export const permissionMap: PermissionRule[] = [
  {
    role: "ADMIN",
    actions: [
      AppAction.CREATE_PRODUCT,
      AppAction.UPDATE_PRODUCT,
      AppAction.DELETE_PRODUCT,
      AppAction.VIEW_DASHBOARD,
      AppAction.MANAGE_USERS,
    ],
  },
  {
    role: "MODERATOR",
    actions: [
      AppAction.CREATE_PRODUCT,
      AppAction.UPDATE_PRODUCT,
      AppAction.VIEW_DASHBOARD,
    ],
  },
  {
    role: "CUSTOMER",
    actions: [AppAction.VIEW_DASHBOARD],
  },
];

// Function to check permission for a role
export function checkPermission(role: Role, action: AppAction) {
  const rule = permissionMap.find((r) => r.role === role);

  if (!rule) {
    return { ok: false, error: `Role "${role}" not found.` };
  }

  if (!rule.actions.includes(action)) {
    return {
      ok: false,
      error: `You don't have permission to perform "${action}".`,
    };
  }

  return { ok: true };
}
