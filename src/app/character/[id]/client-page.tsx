"use client";

import { useCharacterDetailQuery } from "@/hooks/react-queries/useCharacterDetailQuery";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

interface ClientPageProps {
  id: string;
}

export default function ClientPage({ id }: ClientPageProps) {
  const router = useRouter();
  const { data: character, isLoading, isError } = useCharacterDetailQuery(id);

  if (isLoading) {
    return <div className="text-center py-10">Loading character...</div>;
  }

  if (isError || !character) {
    return (
      <div className="text-center py-10 text-red-500">
        Error loading character
      </div>
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

      <Card className="max-w-2xl mx-auto overflow-hidden">
        <div className="relative h-80 w-full bg-slate-100">
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
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <h3 className="font-semibold text-slate-500 mb-1">Status</h3>
              <p className="text-lg capitalize">{character.status}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <h3 className="font-semibold text-slate-500 mb-1">Species</h3>
              <p className="text-lg">{character.species}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <h3 className="font-semibold text-slate-500 mb-1">Gender</h3>
              <p className="text-lg capitalize">{character.gender}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <h3 className="font-semibold text-slate-500 mb-1">Origin</h3>
              <p className="text-lg">{character.origin.name}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <h3 className="font-semibold text-slate-500 mb-1">Location</h3>
              <p className="text-lg">{character.location.name}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <h3 className="font-semibold text-slate-500 mb-1">Episodes</h3>
              <p className="text-lg">{character.episode.length} episodes</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
