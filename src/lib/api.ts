import { ApiResponse, Character, FilterParams } from "@/types";

const BASE_URL = "https://rickandmortyapi.com/api";

export async function getCharacters(
  params: FilterParams = {}
): Promise<ApiResponse<Character>> {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.append("page", params.page.toString());
  if (params.name) searchParams.append("name", params.name);
  if (params.status) searchParams.append("status", params.status);
  if (params.species) searchParams.append("species", params.species);
  if (params.gender) searchParams.append("gender", params.gender);

  const res = await fetch(`${BASE_URL}/character?${searchParams.toString()}`);

  if (!res.ok) {
    if (res.status === 404) {
      return {
        info: { count: 0, pages: 0, next: null, prev: null },
        results: [],
      };
    }
    throw new Error("Failed to fetch characters");
  }

  return res.json();
}

export async function getCharacter(id: string): Promise<Character> {
  const res = await fetch(`${BASE_URL}/character/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch character");
  }

  return res.json();
}

export async function getEpisodes(urls: string[]) {
  // Extract IDs from URLs to fetch multiple episodes in one go if possible,
  // or just fetch them individually. For simplicity and performance on client,
  // we might fetch them.
  // The API supports getting multiple episodes: https://rickandmortyapi.com/api/episode/1,2,3

  if (urls.length === 0) return [];

  const ids = urls.map((url) => url.split("/").pop()).join(",");
  const res = await fetch(`${BASE_URL}/episode/${ids}`);

  if (!res.ok) {
    throw new Error("Failed to fetch episodes");
  }

  const data = await res.json();
  // If only one ID is requested, it returns an object, otherwise an array.
  return Array.isArray(data) ? data : [data];
}
