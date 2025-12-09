import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getCharacters } from "@/lib/api";
import { CHARACTERS_QUERY_KEYS } from "@/lib/query-keys";
import ClientPage from "./client-page";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const queryClient = new QueryClient();

  const page =
    typeof resolvedSearchParams.page === "string"
      ? parseInt(resolvedSearchParams.page)
      : 1;
  const name =
    typeof resolvedSearchParams.search === "string"
      ? resolvedSearchParams.search
      : "";
  const status =
    typeof resolvedSearchParams.status === "string"
      ? resolvedSearchParams.status
      : "";
  const gender =
    typeof resolvedSearchParams.gender === "string"
      ? resolvedSearchParams.gender
      : "";
  const species =
    typeof resolvedSearchParams.species === "string"
      ? resolvedSearchParams.species
      : "";

  const queryParams = { page, name, status, gender, species };
  const paramString = JSON.stringify(queryParams);

  await queryClient.prefetchQuery({
    queryKey: CHARACTERS_QUERY_KEYS.list(paramString),
    queryFn: () => getCharacters(queryParams),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientPage />
    </HydrationBoundary>
  );
}
