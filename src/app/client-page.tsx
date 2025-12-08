"use client";

import { CharacterList } from "@/components/CharacterList";
import SearchInput from "@/components/SearchInput";
import FilterInput from "@/components/FilterInput";
import { Card } from "@/components/ui/card";

export default function ClientPage() {
  return (
    <div className="space-y-8">
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Rick and Morty Explorer
        </h1>
        <p className="text-lg text-slate-600">
          Explore characters from the multiverse
        </p>
      </div>

      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <SearchInput />
          <div className="flex gap-4 w-full md:w-auto">
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
            />
          </div>
        </div>
      </Card>

      <CharacterList />
    </div>
  );
}
