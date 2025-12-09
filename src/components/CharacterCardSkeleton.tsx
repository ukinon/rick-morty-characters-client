"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function CharacterCardSkeleton() {
  return (
    <Card className="overflow-hidden h-full">
      <div className="relative h-64 w-full">
        <Skeleton className="h-full w-full" />
      </div>
      <CardHeader className="p-4 pb-2 space-y-2">
        <div className="flex justify-between items-start gap-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        <div className="mt-auto pt-2 space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </CardContent>
    </Card>
  );
}
