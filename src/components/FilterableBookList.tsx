// components/FilterableBookList.tsx
"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import BookCard from './BookCard';
import type { Book } from '../types/book';

interface Props {
  books: Book[];
  genres: string[];
}

export default function FilterableBookList({ books, genres }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // A função de filtro agora acontece diretamente no servidor,
  // mas podemos manter os controlos aqui.
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set('genre', e.target.value);
    router.push(`/biblioteca?${params.toString()}`);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set('q', e.target.value);
    router.push(`/biblioteca?${params.toString()}`);
  };

  return (
    <div>
      {/* Filtros */}
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Buscar livro..."
          defaultValue={searchParams.get('q') ?? ''}
          onChange={handleSearchChange}
          className="border rounded-lg px-3 py-2 w-full sm:w-64"
        />
        <select
          defaultValue={searchParams.get('genre') ?? 'Todos'}
          onChange={handleFilterChange}
          className="border rounded-lg px-3 py-2"
        >
          <option value="Todos">Todos os Géneros</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      {/* Grid de livros */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
        {books.map((livro) => (
          <Link href={`/Books/${livro.id}`} key={livro.id}>
            <BookCard
              titulo={livro.title}
              autor={livro.author}
              capa={livro.cover}
              genero={livro.genre ?? ''}
              ano={livro.year ?? 0}
              avaliacao={livro.rating ?? 0}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}