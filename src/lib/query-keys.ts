export const CHARACTERS_QUERY_KEYS = {
  all: ["characters"] as const,
  lists: () => [...CHARACTERS_QUERY_KEYS.all, "list"] as const,
  list: (params: string) => [...CHARACTERS_QUERY_KEYS.lists(), params] as const,
  details: () => [...CHARACTERS_QUERY_KEYS.all, "detail"] as const,
  detail: (id: string) => [...CHARACTERS_QUERY_KEYS.details(), id] as const,
};
