'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { addBook, deleteBookById, updateBook } from './db';

  
export async function deleteBookAction(id: string) {
  try {
    await deleteBookById(id);
    // Revalida o cache da página da biblioteca para que a lista seja atualizada.
    revalidatePath('/biblioteca');
  } catch (error) {
    console.error('Erro ao excluir livro:', error);
    // Em uma aplicação real, poderíamos retornar uma mensagem de erro.
  }

  // Redireciona o usuário de volta para a biblioteca após a exclusão.
  redirect('/biblioteca');
}

/**
 * Server Action para ATUALIZAR um livro existente.
 */
export async function updateBookAction(id: string, formData: FormData) {
  // Extrai e converte os dados do formulário.
  const bookData = {
    title: formData.get('title') as string,
    author: formData.get('author') as string,
    year: Number(formData.get('year')),
    genre: formData.get('genre') as string,
    rating: Number(formData.get('rating')),
    synopsis: formData.get('synopsis') as string,
  };

  try {
    // 1. Chama a função do "banco de dados" para atualizar.
    await updateBook(id, bookData);

    // 2. Limpa o cache da página de detalhes e da biblioteca para mostrar os dados novos.
    revalidatePath('/biblioteca');
    revalidatePath(`/Books/${id}`);

  } catch (error) {
    console.error('Erro ao atualizar livro:', error);
  }

  // 3. Redireciona o usuário de volta para a página de detalhes do livro.
  redirect(`/Books/${id}`);
}

/**
 * Server Action para CRIAR um novo livro.
 */
export async function createBookAction(formData: FormData) {
  const newBookData = {
    title: formData.get('title') as string,
    author: formData.get('author') as string,
    year: Number(formData.get('year')),
    genre: formData.get('genre') as string,
    rating: Number(formData.get('rating')),
    synopsis: formData.get('synopsis') as string,
    cover: '/fallback.jpg', // Usamos uma imagem padrão para novos livros.
  };

  try {
    await addBook(newBookData);
    // Revalida o cache para que o novo livro apareça na lista.
    revalidatePath('/biblioteca');
  } catch (error) {
    console.error('Erro ao criar livro:', error);
  }
  redirect('/biblioteca');
}