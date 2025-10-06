import { revalidatePath } from 'next/cache';
import { createBook, updateBook, deleteBook } from "../../lib/db";


export async function createBookAction(formData: FormData) {
  'use server';
  const title = String(formData.get('title') ?? '');
  const author = String(formData.get('author') ?? '');
  const genre = String(formData.get('genre') ?? '');
  const description = String(formData.get('description') ?? '');

  if (!title || !author) throw new Error('title & author required');

  await createBook({ title, author, genre: genre || undefined, description: description || undefined });


  revalidatePath('/books');
}

export async function updateBookAction(id: string, formData: FormData) {
  'use server';
  const title = String(formData.get('title') ?? '');
  const author = String(formData.get('author') ?? '');
  const genre = String(formData.get('genre') ?? '');
  const description = String(formData.get('description') ?? '');

  await updateBook(id, { title, author, genre: genre || undefined, description: description || undefined });
  revalidatePath(`/books`);
  revalidatePath(`/books/${id}`);
}

export async function deleteBookAction(id: string) {
  'use server';
  await deleteBook(id);
  revalidatePath('/books');
}
