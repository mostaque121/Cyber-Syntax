"use client";

import PaginationControl from "@/components/custom-ui/pagination-control";
import { useUrlParams } from "@/hooks/use-url-params";
import { useUsers } from "../../../hooks/use-users";
import UserFilter from "./user-filter";
import UserList from "./user-list";

export function UsersClient() {
  const { searchParams, setParam } = useUrlParams();
  const limit = 10;

  const page = searchParams.get("page");
  const search = searchParams.get("search");
  const role = searchParams.get("role") || "all";
  const banned = searchParams.get("banned") || "all";
  const emailVerified = searchParams.get("emailVerified") || "all";

  const { users, pagination, isLoading, isError, error } = useUsers({
    page,
    limit,
    search,
    role,
    banned,
    emailVerified,
  });

  return (
    <div className="px-4 md:px-8 py-8 container mx-auto">
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="font-bold text-2xl">User Management</h1>
          <p className="text-gray-500 text-sm mt-1">
            View and manage user accounts, roles, and permissions
          </p>
        </div>
      </div>

      <UserFilter
        role={role}
        onRoleChange={(val) => setParam("role", val)}
        banned={banned}
        onBannedChange={(val) => setParam("banned", val)}
        emailVerified={emailVerified}
        onEmailVerifiedChange={(val) => setParam("emailVerified", val)}
        onSearch={(val) => setParam("search", val)}
        searchValue={search || ""}
      />

      <UserList
        className="mt-6"
        isLoading={isLoading}
        isError={isError}
        error={error}
        users={users}
      />

      <PaginationControl
        currentPage={pagination?.page ?? 1}
        totalPages={pagination?.totalPages ?? 1}
        onPageChange={(page) => setParam("page", page.toString())}
      />
    </div>
  );
}
