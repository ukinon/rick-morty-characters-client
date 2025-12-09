import Image from "next/image";
import Link from "next/link";
import { Character } from "@/types";
import { useStore } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  const { favorites, toggleFavorite } = useStore();
  const isFavorite = favorites.includes(character.id);

  const statusColor =
    {
      Alive: "bg-green-500",
      Dead: "bg-red-500",
      unknown: "bg-gray-500",
    }[character.status] || "bg-gray-500";

  return (
    <Link href={`/character/${character.id}`} className="block h-full" prefetch>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:-translate-y-1">
        <div className="relative h-64 w-full bg-slate-100 dark:bg-slate-800">
          <Image
            src={character.image}
            alt={character.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardHeader className="p-4 pb-2 space-y-0">
          <div className="flex justify-between items-start gap-2">
            <CardTitle
              className="text-xl font-bold text-slate-800 dark:text-slate-100 truncate"
              title={character.name}
            >
              {character.name}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(character.id);
              }}
              className={`h-8 w-8 shrink-0 ${
                isFavorite
                  ? "text-red-500 hover:text-red-600"
                  : "text-gray-300 hover:text-red-400 dark:text-gray-600 dark:hover:text-red-400"
              }`}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <Heart className={`h-6 w-6 ${isFavorite ? "fill-current" : ""}`} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0 flex flex-col flex-grow">
          <div className="flex items-center gap-2 mb-4">
            <span className={`h-3 w-3 rounded-full ${statusColor}`} />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {character.status} - {character.species}
            </span>
          </div>

          <div className="mt-auto pt-2 text-sm text-slate-500 dark:text-slate-400">
            <p className="mb-1">
              <span className="font-semibold text-slate-400 dark:text-slate-500">
                Last known location:
              </span>
              <br />
              {character.location.name}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
