import { useQuery } from "@tanstack/react-query";
import { getCharacter } from "@/lib/api";
import { CHARACTERS_QUERY_KEYS } from "@/lib/query-keys";

export function useCharacterDetailQuery(id: string) {
  return useQuery({
    queryKey: CHARACTERS_QUERY_KEYS.detail(id),
    queryFn: () => getCharacter(id),
    enabled: !!id,
  });
}
