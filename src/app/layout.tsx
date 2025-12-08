import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import QueryProvider from "@/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rick and Morty Explorer",
  description: "Explore characters from the Rick and Morty universe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen flex flex-col`}
      >
        <QueryProvider>
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="bg-slate-900 text-slate-400 py-6 text-center">
            <p>© {new Date().getFullYear()} Rick and Morty Explorer</p>
          </footer>
        </QueryProvider>
      </body>
    </html>
  );
}
