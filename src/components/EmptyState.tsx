import { AlertCircle, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ElementType;
  actionLabel?: string;
  onAction?: () => void;
  isError?: boolean;
}

export function EmptyState({
  title = "No results found",
  description = "Try adjusting your search or filters to find what you're looking for.",
  icon: Icon = SearchX,
  actionLabel,
  onAction,
  isError = false,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-in fade-in zoom-in duration-500">
      <div
        className={`p-4 rounded-full mb-4 ${
          isError ? "bg-red-100 text-red-500" : "bg-slate-100 text-slate-500"
        }`}
      >
        <Icon className="h-12 w-12" />
      </div>
      <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
        {title}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 max-w-md mb-6">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant={isError ? "destructive" : "default"}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
