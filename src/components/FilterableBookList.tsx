// components/FilterableBookList.tsx
"use client";

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

  // Esta função cria a nova URL com os parâmetros de filtro e navega para ela.
  const handleFilterChange = (key: 'genre' | 'q', value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/biblioteca?${params.toString()}`);
  };

  return (
    <div>
      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por título ou autor..."
          defaultValue={searchParams.get('q') ?? ''}
          // Usamos onBlur para atualizar a busca quando o usuário sai do campo,
          // ou pode ser trocado por onChange se a busca instantânea for preferida.
          onChange={(e) => handleFilterChange('q', e.target.value)}
          className="border rounded-lg px-3 py-2 w-full sm:w-64"
        />
        <select
          value={searchParams.get('genre') ?? 'Todos'}
          onChange={(e) => handleFilterChange('genre', e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="Todos">Todos os Géneros</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      {/* Grid de livros */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {books.map((livro) => (
          <Link href={`/Books/${livro.id}`} key={livro.id}>
            <BookCard
              title={livro.title}
              author={livro.author}
              cover={livro.cover}
              genre={livro.genre} 
              year={livro.year}
              rating={livro.rating}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
