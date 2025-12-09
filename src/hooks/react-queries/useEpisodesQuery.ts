import { useQuery } from "@tanstack/react-query";
import { getEpisodes } from "@/lib/api";
import { EPISODES_QUERY_KEYS } from "@/lib/query-keys";

export function useEpisodesQuery(urls: string[]) {
  return useQuery({
    queryKey: EPISODES_QUERY_KEYS.byUrls(urls),
    queryFn: () => getEpisodes(urls),
    enabled: urls.length > 0,
  });
}
