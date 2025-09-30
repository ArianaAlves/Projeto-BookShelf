import { books } from "../data/books";
import type { Book } from "../../types/book";

export async function getBook(id: string): Promise<Book | undefined> {
  // A propriedade agora é 'id' em data/books.ts, mas vamos garantir consistência
  const bookData = books.find(b => b.id === id);
  if (!bookData) return undefined;

  // Mapeia os dados para o tipo Book se houver alguma inconsistência restante
  // Com a correção em data/books.ts, isso se torna uma simples passagem.
  return { ...bookData };
}

export async function updateBook(id: string, payload: Partial<Book>): Promise<Book | null> {
  const idx = books.findIndex(b => b.id === id);
  if (idx === -1) return null;
  
  // Atualiza o livro no array
  books[idx] = { ...books[idx], ...payload };
  return books[idx];
}

// Função de exclusão simplificada e corrigida
export async function deleteBookById(id: string): Promise<boolean> {
  const index = books.findIndex(b => b.id === id);
  if (index === -1) {
    return false; // Retorna falso se o livro não for encontrado
  }
  books.splice(index, 1); // Remove o livro do array
  return true;
}
