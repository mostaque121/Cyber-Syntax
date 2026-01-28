import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../actions/product-actions";

export function useProducts(params: {
  page?: string | null;
  limit?: number;
  search?: string | null;
  filter?: string | null;
}) {
  const pageNumber = params.page ? Number(params.page) : 1;
  const filterParam = (() => {
    const val = params.filter;
    if (
      val === "hot" ||
      val === "featured" ||
      val === "available" ||
      val === "all"
    )
      return val;
    return "all";
  })();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["products", pageNumber, params.search, filterParam],
    queryFn: () =>
      getProducts({
        page: pageNumber,
        limit: params.limit,
        filter: filterParam,
      }),
    placeholderData: (prev) => prev,
  });

  return {
    products: data?.data ?? [],
    pagination: data?.pagination,
    isLoading,
    isError,
    error,
    refetch,
  };
}
