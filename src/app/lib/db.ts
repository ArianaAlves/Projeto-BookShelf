import { books } from "../data/books";
import type { Book } from "../../types/book";

export async function getBook(id: string): Promise<Book | undefined> {
  return books.find(b => b.id === id);
}

export async function updateBook(id: string, payload: Partial<Book>): Promise<Book | null> {
  const idx = books.findIndex(b => b.id === id);
  if (idx === -1) return null;
  books[idx] = { ...books[idx], ...payload };
  return books[idx];
}

export async function deleteBookById(id: string): Promise<boolean> {
  const before = books.length;
  // reassign para desenvolvimento
  (globalThis as any).books = books.filter(b => b.id !== id); // só para demo; se usar export let books, adapte
  // aqui, para simplificar:
  const found = books.find(b => b.id === id);
  if (!found) return false;
  books.splice(books.indexOf(found), 1);
  return true;
}
