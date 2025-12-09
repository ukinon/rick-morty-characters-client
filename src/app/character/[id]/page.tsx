import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getCharacter } from "@/lib/api";
import { CHARACTERS_QUERY_KEYS } from "@/lib/query-keys";
import ClientPage from "./client-page";

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: CHARACTERS_QUERY_KEYS.detail(id),
    queryFn: () => getCharacter(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientPage id={id} />
    </HydrationBoundary>
  );
}
