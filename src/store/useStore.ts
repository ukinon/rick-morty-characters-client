import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  favorites: number[];
  toggleFavorite: (id: number) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      favorites: [],
      toggleFavorite: (id) =>
        set((state) => {
          const isFavorite = state.favorites.includes(id);
          const newFavorites = isFavorite
            ? state.favorites.filter((favId) => favId !== id)
            : [...state.favorites, id];
          return { favorites: newFavorites };
        }),
    }),
    {
      name: "rick-morty-storage",
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);
