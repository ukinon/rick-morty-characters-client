import { useQuery } from "@tanstack/react-query";
import { getCharacters } from "@/lib/api";
import { CHARACTERS_QUERY_KEYS } from "@/lib/query-keys";
import { useSearchQuery } from "@/hooks/useSearchQuery";

export function useCharactersQuery() {
  const { page, search, filters } = useSearchQuery();

  const status = filters["status"] as string | undefined;
  const gender = filters["gender"] as string | undefined;
  const species = filters["species"] as string | undefined;

  const queryParams = {
    page,
    name: search,
    status,
    gender,
    species,
  };

  // Create a stable string representation of params for the query key
  const paramString = JSON.stringify(queryParams);

  return useQuery({
    queryKey: CHARACTERS_QUERY_KEYS.list(paramString),
    queryFn: () => getCharacters(queryParams),
    placeholderData: (previousData) => previousData, // Keep previous data while fetching new data
  });
}
