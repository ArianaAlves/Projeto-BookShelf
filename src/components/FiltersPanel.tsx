"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function FiltersPanel({ genres }: { genres: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [genre, setGenre] = useState(searchParams.get("genre") ?? "");

  useEffect(() => {
    setSearch(searchParams.get("search") ?? "");
    setGenre(searchParams.get("genre") ?? "");
  }, [searchParams]);

  function applyFilters() {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (genre) params.set("genre", genre);

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex gap-2 items-center mb-4">
      <input
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded p-2"
      />
      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="border rounded p-2"
      >
        <option value="">Todos os gêneros</option>
        {genres.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
      <button
        onClick={applyFilters}
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        Aplicar
      </button>
    </div>
  );
}
