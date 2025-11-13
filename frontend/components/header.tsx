"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="bg-primary border-b border-secondary">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-white font-bold text-xl">MovieApp</span>
            </Link>

            <nav className="flex items-center gap-6">
              <Link
                href="/"
                className={`transition-colors ${
                  isActive("/")
                    ? "text-muted font-bold"
                    : "text-white hover:text-accent"
                }`}
              >
                Início
              </Link>
              <Link
                href="/movies"
                className={`transition-colors ${
                  isActive("/movies")
                    ? "text-muted font-bold"
                    : "text-white hover:text-accent"
                }`}
              >
                Filmes
              </Link>
              <Link
                href="/actors"
                className={`transition-colors ${
                  isActive("/actors")
                    ? "text-muted font-bold"
                    : "text-white hover:text-accent"
                }`}
              >
                Atores
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}