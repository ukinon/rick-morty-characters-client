import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export function Header() {
  return (
    <header className="bg-slate-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          Rick & Morty
        </Link>
        <nav className="flex items-center gap-4">
          <ul className="flex gap-4">
            <li>
              <Link href="/" className="hover:text-cyan-400 transition-colors">
                Characters
              </Link>
            </li>
            <li>
              <Link
                href="/favorites"
                className="hover:text-cyan-400 transition-colors"
              >
                Favorites
              </Link>
            </li>
          </ul>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
