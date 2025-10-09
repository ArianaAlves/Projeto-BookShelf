// app/lib/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
// O arquivo src/app/lib/db.ts exporta `addBook` e `deleteBookById`.
// Aqui fazemos alias para preservar os nomes usados nas actions.
import { createBook, deleteBook, updateBook } from './db';

export async function deleteBookAction(id: number) {
  try {
    await deleteBook(id); // <- Use a função do Prisma
    revalidatePath('/biblioteca');
  } catch (error) {
    console.error('Erro ao excluir livro:', error);
  }
  redirect('/biblioteca');
}

export async function updateBookAction(id: number, formData: FormData) {
  const bookData = {
    title: formData.get('title') as string,
    author: formData.get('author') as string,
    year: Number(formData.get('year')),
    genre: formData.get('genre') as string,
    rating: Number(formData.get('rating')),
    synopsis: formData.get('synopsis') as string,
  };

  try {
    await updateBook(id, bookData); // <- Use a função do Prisma
    revalidatePath('/biblioteca');
    revalidatePath(`/Books/${id}`);
  } catch (error) {
    console.error('Erro ao atualizar livro:', error);
  }
  redirect(`/Books/${id}`);
}

export async function createBookAction(formData: FormData) {
  const newBookData = {
    title: formData.get('title') as string,
    author: formData.get('author') as string,
    year: Number(formData.get('year')),
    genre: formData.get('genre') as string,
    rating: Number(formData.get('rating')),
    synopsis: formData.get('synopsis') as string,
    cover: '/fallback.jpg',
  };

  try {
    await createBook(newBookData); // <- Use a função do Prisma
    revalidatePath('/biblioteca');
  } catch (error) {
    console.error('Erro ao criar livro:', error);
  }
  redirect('/biblioteca');
}