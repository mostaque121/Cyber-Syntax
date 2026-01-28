import { useQuery } from "@tanstack/react-query";
import { getContactSubmissions } from "../actions/contact-actions";

export function useContactSubmissions(params: {
  page?: string | null;
  limit?: number;
  search?: string | null;
  status?: string | null;
}) {
  const pageNumber = params.page ? Number(params.page) : 1;
  const statusParam = params.status || "all";

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["contact-submissions", pageNumber, params.search, statusParam],
    queryFn: () =>
      getContactSubmissions({
        page: pageNumber,
        limit: params.limit || 10,
        status: statusParam,
        search: params.search || undefined,
      }),
    placeholderData: (prev) => prev,
  });

  return {
    submissions: data?.data ?? [],
    pagination: data?.pagination,
    isLoading,
    isError,
    error,
    refetch,
  };
}
