"use client";

import { useFavoriteCharactersQuery } from "@/hooks/react-queries/useFavoriteCharactersQuery";
import { CharacterCard } from "@/components/CharacterCard";
import { useStore } from "@/store/useStore";
import { HeartOff, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CharacterCardSkeleton } from "@/components/CharacterCardSkeleton";
import { EmptyState } from "@/components/EmptyState";
import { motion } from "framer-motion";

export default function ClientPage() {
  const { favorites } = useStore();
  const { data: characters, isLoading, isError } = useFavoriteCharactersQuery();

  if (favorites.length === 0) {
    return (
      <EmptyState
        title="No Favorites Yet"
        description="You haven't added any characters to your favorites list."
        icon={HeartOff}
        actionLabel="Browse Characters"
        onAction={() => (window.location.href = "/")}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <CharacterCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <EmptyState
        title="Error loading favorites"
        description="We couldn't load your favorite characters."
        icon={AlertCircle}
        isError
      />
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-8">
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
          Your Favorites
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          {favorites.length} character{favorites.length !== 1 ? "s" : ""} saved
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {characters?.map((character) => (
          <motion.div key={character.id} variants={item}>
            <CharacterCard character={character} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
