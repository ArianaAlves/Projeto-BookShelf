import { NextRequest, NextResponse } from 'next/server';
import { getBookById, updateBook, deleteBook } from '@/lib/db';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const book = await getBookById(id);
  if (!book) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(book);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();
  const updated = await updateBook(id, body);
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  await deleteBook(id);
  return NextResponse.json({ message: 'deleted' }, { status: 204 });
}
