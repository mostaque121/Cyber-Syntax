// types/permissions.ts
export type Role = "ADMIN" | "MANAGER" | "USER";

export type AppAction =
  | "CREATE_PRODUCT"
  | "UPDATE_PRODUCT"
  | "DELETE_PRODUCT"
  | "VIEW_DASHBOARD"
  | "MANAGE_USERS"; // extend as needed

export type PermissionRule = {
  role: Role;
  actions: AppAction[];
};
