import { render, screen, fireEvent, act } from "@testing-library/react";
import SearchInput from "./SearchInput";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

const mockHandlePageChange = vi.fn();

vi.mock("@/hooks/useSearchQuery", () => ({
  useSearchQuery: () => ({
    handlePageChange: mockHandlePageChange,
    filters: {},
    sort: "",
    order: "",
    search: "",
  }),
}));

describe("SearchInput", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockHandlePageChange.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders input correctly", () => {
    render(<SearchInput />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("updates value on change", () => {
    render(<SearchInput />);
    const input = screen.getByPlaceholderText("Search...") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Rick" } });
    expect(input.value).toBe("Rick");
  });

  it("calls handlePageChange after debounce", () => {
    render(<SearchInput />);
    const input = screen.getByPlaceholderText("Search...");

    fireEvent.change(input, { target: { value: "Morty" } });

    expect(mockHandlePageChange).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(mockHandlePageChange).toHaveBeenCalledWith(
      expect.objectContaining({
        search: "Morty",
        page: 1,
      })
    );
  });

  it("debounces multiple changes", () => {
    render(<SearchInput />);
    const input = screen.getByPlaceholderText("Search...");

    fireEvent.change(input, { target: { value: "R" } });
    act(() => {
      vi.advanceTimersByTime(100);
    });

    fireEvent.change(input, { target: { value: "Ri" } });
    act(() => {
      vi.advanceTimersByTime(100);
    });

    fireEvent.change(input, { target: { value: "Ric" } });
    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(mockHandlePageChange).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(mockHandlePageChange).toHaveBeenCalledTimes(1);
    expect(mockHandlePageChange).toHaveBeenCalledWith(
      expect.objectContaining({
        search: "Ric",
      })
    );
  });
});
