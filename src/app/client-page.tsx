"use client";

import { CharacterList } from "@/components/CharacterList";
import SearchInput from "@/components/SearchInput";
import FilterInput from "@/components/FilterInput";
import { Card } from "@/components/ui/card";

export default function ClientPage() {
  return (
    <div className="space-y-10">
      <Card className="p-5 bg-white/90 dark:bg-slate-900/85 border border-slate-200 dark:border-slate-800 shadow-lg">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-3">
              <p className="text-base font-semibold text-slate-800 dark:text-slate-100">
                Search and filter characters
              </p>
            </div>
            <div className="w-full md:w-auto">
              <SearchInput />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <FilterInput
              placeholder="Status"
              paramName="status"
              options={[
                { label: "Alive", value: "alive" },
                { label: "Dead", value: "dead" },
                { label: "Unknown", value: "unknown" },
              ]}
              width="100%"
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
              width="100%"
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
              width="100%"
            />
          </div>
        </div>
      </Card>

      <CharacterList />
    </div>
  );
}
