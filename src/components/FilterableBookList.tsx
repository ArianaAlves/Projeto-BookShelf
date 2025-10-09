'use client';

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

  const [livrosVisiveis, setLivrosVisiveis] = useState<Book[]>(books);
  const [lixeira, setLixeira] = useState<Book[]>([]);

  const handleFilterChange = (key: 'genre' | 'q', value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/biblioteca?${params.toString()}`);
  };

  const excluirLivro = (livro: Book) => {
    setLivrosVisiveis(prev => prev.filter(b => b.id !== livro.id));
    setLixeira(prev => [...prev, livro]);
  };

  return (
    <div>
      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por título ou autor..."
          defaultValue={searchParams.get('q') ?? ''}
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

      {/* Grid de livros (aqui está a parte importante) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
        {books.map((livro) => (
          <Link href={`/livros/${livro.id}`} key={livro.id}>
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

