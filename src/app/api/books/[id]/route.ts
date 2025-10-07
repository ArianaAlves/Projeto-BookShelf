// app/api/books/[id]/route.ts
import { NextResponse } from 'next/server';
import { getBook, updateBookById, deleteBookById } from '../../../../../prisma/lib/db'; // Ajuste o caminho
import { books } from '../../../data/books'; // Usado para encontrar o índice

// GET /api/books/[id] - Obter detalhes de um livro
export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const book = await getBook(params.id);
  if (!book) {
    return NextResponse.json({ message: 'Livro não encontrado' }, { status: 404 });
  }
  return NextResponse.json(book);
}

// PUT /api/books/[id] - Atualizar um livro
export async function PUT(
  request: Request,
  { params }: { params: { id: number } }
) {
  const book = await getBook(params.id);
  if (!book) {
    return NextResponse.json({ message: 'Livro não encontrado' }, { status: 404 });
  }

  const body = await request.json();
  const updatedBook = await updateBookById(params.id, body);

  return NextResponse.json(updatedBook);
}

// DELETE /api/books/[id] - Remover um livro
export async function DELETE(
  request: Request,
  { params }: { params: { id: number } }
) {
  const success = await deleteBookById(params.id);
  if (!success) {
    return NextResponse.json({ message: 'Livro não encontrado' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Livro removido com sucesso' });
}