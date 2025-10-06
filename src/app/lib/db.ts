import { books } from "../data/books";
import type { Book } from "../../types/book";

export async function getBooks(query: string, genre: string): Promise<Book[]> {
  let filteredBooks = [...books]; // Usamos uma cópia para não alterar a lista original.

  // Filtra por gênero, se um gênero for fornecido e não for "Todos".
  if (genre && genre !== 'Todos') {
    filteredBooks = filteredBooks.filter(book => book.genre === genre);
  }

  // Filtra pelo termo de busca.
  if (query) {
    const lowerCaseQuery = query.toLowerCase();
    filteredBooks = filteredBooks.filter(book =>
      book.title.toLowerCase().includes(lowerCaseQuery) ||
      book.author.toLowerCase().includes(lowerCaseQuery)
    );
  }

  return filteredBooks;
}

export async function getBook(id: number): Promise<Book | undefined> {
  return books.find(b => b.id === id);
}


export async function getGenres(): Promise<string[]> {
  // O Set garante que cada gênero apareça apenas uma vez.
  const allGenres = new Set(books.map(book => book.genre).filter(Boolean));
  return Array.from(allGenres);
}


export async function addBook(payload: Omit<Book, 'id'>): Promise<Book> {
  const newBook: Book = {
    id: Number(Date.now()), // Gera um ID simples baseado no tempo.
    ...payload,
  };
  books.push(newBook);
  return newBook;
}

export async function updateBook(id: number, payload: Partial<Book>): Promise<Book | null> {
  const idx = books.findIndex(b => b.id === id);
  if (idx === -1) return null;

  books[idx] = { ...books[idx], ...payload };
  return books[idx];
}

export async function deleteBookById(id: number): Promise<boolean> {
  const index = books.findIndex(b => b.id === id);
  if (index === -1) {
    return false;
  }
  books.splice(index, 1);
  return true;
}

