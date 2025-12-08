import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function useSearchQuery() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentParams = useMemo(() => {
    const page = searchParams.get("page")
      ? parseInt(searchParams.get("page") || "1", 10)
      : 1;
    const search = searchParams.get("search")
      ? decodeURIComponent(searchParams.get("search") || "")
      : "";
    const sort = searchParams.get("sort") || "";
    const order = searchParams.get("order") || "";
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit") || "10", 10)
      : 10;

    const filters: Record<string, string | number | boolean> = {};
    searchParams.forEach((value, key) => {
      if (!["page", "search", "sort", "order", "limit"].includes(key)) {
        filters[key] = decodeURIComponent(value);
      }
    });

    return { page, search, sort, order, limit, filters };
  }, [searchParams]);

  const handlePageChange = ({
    page,
    path,
    search,
    filters,
    sort,
    order,
    limit,
  }: {
    page: number;
    path?: string;
    search?: string;
    filters?: Record<string, string | number | boolean>;
    sort?: string;
    order?: "asc" | "desc";
    limit?: number;
  }) => {
    const params = new URLSearchParams();

    if (page > 1) params.set("page", page.toString());
    if (search) params.set("search", search);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.set(key, value.toString());
      });
    }
    if (sort) params.set("sort", sort);
    if (order) params.set("order", order);
    if (limit && limit !== 10) params.set("limit", limit.toString());

    const queryString = params.toString();
    const basePath = path || window.location.pathname;
    router.replace(`${basePath}${queryString ? `?${queryString}` : ""}`, {
      scroll: false,
    });
  };

  return {
    ...currentParams,
    handlePageChange,
  };
}
