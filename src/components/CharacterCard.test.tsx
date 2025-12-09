import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { CharacterCard } from "./CharacterCard";
import { vi, describe, it, expect } from "vitest";
import { Character } from "@/types";

vi.mock("next/image", () => ({
  default: (props: React.ComponentProps<"img">) => <img {...props} />,
}));

const mockToggleFavorite = vi.fn();
const mockFavorites: number[] = [];

vi.mock("@/store/useStore", () => ({
  useStore: () => ({
    favorites: mockFavorites,
    toggleFavorite: mockToggleFavorite,
  }),
}));

const mockCharacter: Character = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: { name: "Earth", url: "" },
  location: { name: "Earth", url: "" },
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  episode: [],
  url: "",
  created: "",
};

describe("CharacterCard", () => {
  it("renders character information correctly", () => {
    render(<CharacterCard character={mockCharacter} />);

    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Alive - Human")).toBeInTheDocument();
    expect(screen.getByText("Earth")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", mockCharacter.image);
  });

  it("calls toggleFavorite when heart button is clicked", () => {
    render(<CharacterCard character={mockCharacter} />);

    const button = screen.getByRole("button", { name: /add to favorites/i });
    fireEvent.click(button);

    expect(mockToggleFavorite).toHaveBeenCalledWith(mockCharacter.id);
  });
});
