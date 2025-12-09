"use client";

import { CharacterList } from "@/components/CharacterList";
import SearchInput from "@/components/SearchInput";
import FilterInput from "@/components/FilterInput";
import { Card } from "@/components/ui/card";

export default function ClientPage() {
  return (
    <div className="space-y-8">
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
          Rick and Morty Explorer
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Explore characters from the multiverse
        </p>
      </div>

      <Card className="p-4 bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col md:flex-row md:flex-wrap gap-4 justify-between items-start md:items-center w-full">
          <SearchInput />
          <div className="flex gap-3 w-full md:w-auto flex-wrap">
            <FilterInput
              placeholder="Status"
              paramName="status"
              options={[
                { label: "Alive", value: "alive" },
                { label: "Dead", value: "dead" },
                { label: "Unknown", value: "unknown" },
              ]}
            />
            <FilterInput
              placeholder="Gender"
              paramName="gender"
              options={[
                { label: "Female", value: "female" },
                { label: "Male", value: "male" },
                { label: "Genderless", value: "genderless" },
                { label: "Unknown", value: "unknown" },
              ]}
              className="w-full md:w-44"
              width="180px"
            />
            <FilterInput
              placeholder="Species"
              paramName="species"
              options={[
                { label: "Human", value: "human" },
                { label: "Alien", value: "alien" },
                { label: "Humanoid", value: "humanoid" },
                { label: "Poopybutthole", value: "poopybutthole" },
                { label: "Mythological", value: "mythological" },
                { label: "Unknown", value: "unknown" },
                { label: "Animal", value: "animal" },
                { label: "Disease", value: "disease" },
                { label: "Robot", value: "robot" },
                { label: "Cronenberg", value: "cronenberg" },
              ]}
              className="w-full md:w-44"
              width="180px"
            />
          </div>
        </div>
      </Card>

      <CharacterList />
    </div>
  );
}
