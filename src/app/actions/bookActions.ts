'use server';

import { revalidatePath } from 'next/cache';
import { createBook, updateBook, deleteBook } from "../../../prisma/lib/db";

export async function createBookAction(formData: FormData) {
  const title = String(formData.get('title') ?? '');
  const author = String(formData.get('author') ?? '');
  const genre = String(formData.get('genre') ?? '');
  const description = String(formData.get('description') ?? '');

  if (!title || !author) throw new Error('title & author required');

  await createBook({ title, author, genre: genre || undefined, description: description || undefined });

  revalidatePath('/livros');
}

export async function updateBookAction(id: string, formData: FormData) {
  const title = String(formData.get('title') ?? '');
  const author = String(formData.get('author') ?? '');
  const genre = String(formData.get('genre') ?? '');
  const description = String(formData.get('description') ?? '');

  await updateBook(id, { title, author, genre: genre || undefined, description: description || undefined });
  revalidatePath(`/livros`);
  revalidatePath(`/livros/${id}`);
}

export async function deleteBookAction(id: string) {
  await deleteBook(id);
  revalidatePath('/livros');
}
