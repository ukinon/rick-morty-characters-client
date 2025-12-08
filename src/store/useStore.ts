import { create } from "zustand";
import { FilterParams } from "@/types";

interface AppState {
  filters: FilterParams;
  setFilter: (
    key: keyof FilterParams,
    value: string | number | undefined
  ) => void;
  resetFilters: () => void;
  favorites: number[];
  toggleFavorite: (id: number) => void;
}

export const useStore = create<AppState>((set) => ({
  filters: {
    page: 1,
    name: "",
    status: "",
    gender: "",
  },
  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
        page: key === "page" ? (value as number) : 1,
      },
    })),
  resetFilters: () =>
    set(() => ({
      filters: { page: 1, name: "", status: "", gender: "" },
    })),
  favorites: [], // We will initialize this from localStorage in a useEffect later
  toggleFavorite: (id) =>
    set((state) => {
      const isFavorite = state.favorites.includes(id);
      const newFavorites = isFavorite
        ? state.favorites.filter((favId) => favId !== id)
        : [...state.favorites, id];

      // Persist to localStorage (basic implementation, can be moved to middleware)
      if (typeof window !== "undefined") {
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
      }
      return { favorites: newFavorites };
    }),
}));
