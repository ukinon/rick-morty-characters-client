"use client";
import React from "react";
import { Input } from "./ui/input";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchInput() {
  const { handlePageChange, filters, sort, order, search } = useSearchQuery();
  const [searchQuery, setSearchQuery] = React.useState(search);
  const path = usePathname();

  // Sync local state with URL param
  React.useEffect(() => {
    setSearchQuery(search);
  }, [search]);

  return (
    <div className="relative w-full max-w-sm">
      <Input
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          const timer = setTimeout(() => {
            handlePageChange({
              page: 1,
              path,
              search: e.target.value,
              filters: filters as Record<string, string | number | boolean>,
              sort: sort || undefined,
              order: (order as "asc" | "desc") || undefined,
            });
          }, 300);
          return () => clearTimeout(timer);
        }}
        className="pl-8 h-10 bg-white/90 text-slate-900 placeholder:text-slate-400 border border-slate-200 hover:border-slate-300 dark:bg-slate-900/80 dark:text-slate-100 dark:placeholder:text-slate-500 dark:border-slate-700 dark:hover:border-slate-600 transition-colors"
      />
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
    </div>
  );
}
