import { useQuery } from "@tanstack/react-query";
import { getUserById, getUsers } from "../actions/user-actions";

export function useUsers(params: {
  page?: string | null;
  limit?: number;
  search?: string | null;
  role?: string | null;
  banned?: string | null;
  emailVerified?: string | null;
}) {
  const pageNumber = params.page ? Number(params.page) : 1;

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [
      "users",
      pageNumber,
      params.search,
      params.role,
      params.banned,
      params.emailVerified,
    ],
    queryFn: () =>
      getUsers({
        page: pageNumber,
        limit: params.limit || 10,
        search: params.search || undefined,
        role: params.role || undefined,
        banned: params.banned || undefined,
        emailVerified: params.emailVerified || undefined,
      }),
    placeholderData: (prev) => prev,
  });

  return {
    users: data?.data ?? [],
    pagination: data?.pagination,
    isLoading,
    isError,
    error,
    refetch,
  };
}

export function useUserById(userId: string) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
}
