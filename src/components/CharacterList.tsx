"use client";

import { useCharactersQuery } from "@/hooks/react-queries/useCharactersQuery";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import { CharacterCard } from "./CharacterCard";
import Paginator from "./Paginator";
import { CharacterCardSkeleton } from "./CharacterCardSkeleton";
import { EmptyState } from "./EmptyState";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export function CharacterList() {
  const { data, isLoading, isError, error } = useCharactersQuery();
  const { page } = useSearchQuery();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <CharacterCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <EmptyState
        title="Something went wrong"
        description={
          error instanceof Error ? error.message : "Failed to load characters"
        }
        icon={AlertCircle}
        isError
        actionLabel="Try Again"
        onAction={() => window.location.reload()}
      />
    );
  }

  if (!data || data.results.length === 0) {
    return <EmptyState />;
  }

  const listKey = JSON.stringify(data.info);

  return (
    <div>
      <motion.div
        key={listKey}
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {data.results.map((character) => (
          <motion.div
            key={character.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <CharacterCard character={character} />
          </motion.div>
        ))}
      </motion.div>

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
