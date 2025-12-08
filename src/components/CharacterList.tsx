"use client";

import { useCharactersQuery } from "@/hooks/react-queries/useCharactersQuery";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import { CharacterCard } from "./CharacterCard";
import Paginator from "./Paginator";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CharacterList() {
  const { data, isLoading, isError, error } = useCharactersQuery();
  const { page } = useSearchQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-12 w-12 animate-spin text-cyan-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg mb-4">
          {error instanceof Error ? error.message : "Failed to load characters"}
        </p>
        <Button
          onClick={() => window.location.reload()}
          className="bg-cyan-500 hover:bg-cyan-600"
        >
          Retry
        </Button>
      </div>
    );
  }

  if (!data || data.results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 text-lg">
          No characters found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.results.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      {data.info && (
        <Paginator
          currentPage={page || 1}
          totalPages={data.info.pages}
          total={data.info.count}
          data={data.results}
        />
      )}
    </div>
  );
}
