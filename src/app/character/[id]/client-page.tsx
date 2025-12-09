"use client";

import { useCharacterDetailQuery } from "@/hooks/react-queries/useCharacterDetailQuery";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft, AlertCircle } from "lucide-react";
import Image from "next/image";
import { EpisodeList } from "@/components/EpisodeList";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/EmptyState";

interface ClientPageProps {
  id: string;
}

export default function ClientPage({ id }: ClientPageProps) {
  const router = useRouter();
  const { data: character, isLoading, isError } = useCharacterDetailQuery(id);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Skeleton className="h-10 w-24 mb-6" />
        <Card className="max-w-4xl mx-auto overflow-hidden">
          <Skeleton className="h-80 w-full" />
          <CardHeader>
            <Skeleton className="h-10 w-1/2 mx-auto" />
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-24 w-full rounded-lg" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError || !character) {
    return (
      <EmptyState
        title="Character not found"
        description="We couldn't find the character you're looking for."
        icon={AlertCircle}
        isError
        actionLabel="Go Back"
        onAction={() => router.back()}
      />
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button
        variant="outline"
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <Card className="max-w-4xl mx-auto overflow-hidden">
        <div className="relative h-80 w-full bg-slate-100 dark:bg-slate-900">
          <Image
            src={character.image}
            alt={character.name}
            fill
            className="object-contain"
            priority
          />
        </div>
        <CardHeader>
          <CardTitle className="text-3xl text-center">
            {character.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <h3 className="font-semibold text-slate-500 dark:text-slate-400 mb-1">
                Status
              </h3>
              <p className="text-lg capitalize">{character.status}</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <h3 className="font-semibold text-slate-500 dark:text-slate-400 mb-1">
                Species
              </h3>
              <p className="text-lg">{character.species}</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <h3 className="font-semibold text-slate-500 dark:text-slate-400 mb-1">
                Gender
              </h3>
              <p className="text-lg capitalize">{character.gender}</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <h3 className="font-semibold text-slate-500 dark:text-slate-400 mb-1">
                Origin
              </h3>
              <p className="text-lg">{character.origin.name}</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <h3 className="font-semibold text-slate-500 dark:text-slate-400 mb-1">
                Location
              </h3>
              <p className="text-lg">{character.location.name}</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <h3 className="font-semibold text-slate-500 dark:text-slate-400 mb-1">
                Episodes
              </h3>
              <p className="text-lg">{character.episode.length} episodes</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              Appears in Episodes
            </h3>
            <EpisodeList urls={character.episode} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
