import { NextResponse } from "next/server";
import { getBook, updateBook, deleteBookById } from "../lib/db";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const book = await getBook(params.id);
  if (!book) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(book);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  const updated = await updateBook(params.id, body);
  if (!updated) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const ok = await deleteBookById(params.id);
  if (!ok) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
