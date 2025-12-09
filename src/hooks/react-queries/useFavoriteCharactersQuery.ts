import { useQuery } from "@tanstack/react-query";
import { getCharactersByIds } from "@/lib/api";
import { CHARACTERS_QUERY_KEYS } from "@/lib/query-keys";
import { useStore } from "@/store/useStore";

export function useFavoriteCharactersQuery() {
  const { favorites } = useStore();

  return useQuery({
    queryKey: CHARACTERS_QUERY_KEYS.favorites(favorites),
    queryFn: () => getCharactersByIds(favorites),
    enabled: favorites.length > 0,
  });
}
