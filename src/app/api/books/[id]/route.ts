// app/api/books/[id]/route.ts
import { NextResponse } from 'next/server';
import { getBook, updateBookById, deleteBookById } from '../../../../../prisma/lib/db';

// Força a execução dinâmica dessa rota
export const dynamic = 'force-dynamic';

// GET /api/books/[id] - Obter detalhes de um livro
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const book = await getBook(id);
  if (!book) {
    return NextResponse.json({ message: 'Livro não encontrado' }, { status: 404 });
  }
  return NextResponse.json(book);
}

// PUT /api/books/[id] - Atualizar um livro
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const book = await getBook(id);
  if (!book) {
    return NextResponse.json({ message: 'Livro não encontrado' }, { status: 404 });
  }

  const body = await request.json();
  const updatedBook = await updateBookById(id, body);

  return NextResponse.json(updatedBook);
}

// DELETE /api/books/[id] - Remover um livro
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const success = await deleteBookById(id);
  if (!success) {
    return NextResponse.json({ message: 'Livro não encontrado' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Livro removido com sucesso' });
}