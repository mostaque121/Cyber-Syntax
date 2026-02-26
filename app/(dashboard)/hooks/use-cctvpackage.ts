import { useQuery } from "@tanstack/react-query";
import { getCctvPackages } from "../actions/cctv-package-actions";

export function useCctvPackage(params: {
  page?: string | null;
  limit?: number;
  search?: string | null;
  isAvailable?: string | null;
}) {
  const pageNumber = params.page ? Number(params.page) : 1;
  const isAvailableParam = (() => {
    const val = params.isAvailable;
    if (val === "true" || val === "false" || val === "all") return val;
    return "all";
  })();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["cctv-packages", pageNumber, params.search, params.isAvailable],
    queryFn: () =>
      getCctvPackages({
        page: pageNumber,
        limit: params.limit,
        search: params.search || "",
        isAvailable: isAvailableParam,
      }),
    placeholderData: (prev) => prev,
  });

  return {
    cctvPackages: data?.data ?? [],
    pagination: data?.pagination,
    isLoading,
    isError,
    error,
    refetch,
  };
}
