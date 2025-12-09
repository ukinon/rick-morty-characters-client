"use client";

import { useEpisodesQuery } from "@/hooks/react-queries/useEpisodesQuery";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface EpisodeListProps {
  urls: string[];
}

export function EpisodeList({ urls }: EpisodeListProps) {
  const { data: episodes, isLoading, isError } = useEpisodesQuery(urls);

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <Loader2 className="h-6 w-6 animate-spin text-cyan-500" />
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500">Failed to load episodes</div>;
  }

  if (!episodes || episodes.length === 0) {
    return <div className="text-slate-500">No episodes found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {episodes.map((episode) => (
        <Card key={episode.id} className="bg-slate-50">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base font-semibold text-slate-800">
              {episode.episode}: {episode.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-sm text-slate-600">{episode.air_date}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
