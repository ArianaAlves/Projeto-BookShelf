// src/app/data/books.ts
import type { Book } from '../../types/book';

export const books: Book[] = [
  {
    id: 1,
    title: 'Dom Casmurro',
    author: 'Machado de Assis',
    genre: 'Romance',
    year: 1899,
    rating: 5
  },
  {
    id: 2,
    title: 'O Pequeno Príncipe',
    author: 'Antoine de Saint-Exupéry',
    genre: 'Fábula',
    year: 1943,
    rating: 4.5
  },
  {
    id: 3,
    title: 'Capitães da Areia',
    author: 'Jorge Amado',
    genre: 'Drama',
    year: 1937,
    rating: 4
  },
];
