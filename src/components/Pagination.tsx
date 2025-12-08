"use client";

import { useSearchQuery } from "@/hooks/useSearchQuery";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalPages: number;
}

export function Pagination({ totalPages }: PaginationProps) {
  const { page, handlePageChange } = useSearchQuery();
  const currentPage = page || 1;

  return (
    <div className="flex justify-center items-center gap-4 py-8">
      <button
        onClick={() => handlePageChange({ page: currentPage - 1 })}
        disabled={currentPage <= 1}
        className="p-2 rounded-md bg-slate-200 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <span className="text-slate-600 font-medium">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => handlePageChange({ page: currentPage + 1 })}
        disabled={currentPage >= totalPages}
        className="p-2 rounded-md bg-slate-200 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
