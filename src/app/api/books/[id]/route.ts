import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma"; // src/app/api/books/[id]/route.ts -> src/lib/prisma.ts

function parseId(param: string) {
  const id = Number(param);
  return Number.isFinite(id) ? id : null;
}

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseId(params.id);
  if (id === null) return NextResponse.json({ message: "ID inválido" }, { status: 400 });

  const book = await prisma.book.findUnique({ where: { id } });
  if (!book) return NextResponse.json({ message: "Livro não encontrado" }, { status: 404 });
  return NextResponse.json(book);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseId(params.id);
  if (id === null) return NextResponse.json({ message: "ID inválido" }, { status: 400 });

  try {
    const body = await req.json();
    const data: any = {};
    if (typeof body.title === "string") data.title = body.title.trim();
    if (typeof body.author === "string") data.author = body.author.trim();
    if ("genre" in body) data.genre = body.genre ?? null;
    if ("description" in body) data.description = body.description ?? null;
    if ("year" in body) data.year = body.year ?? null;
    if ("rating" in body) data.rating = body.rating ?? null;
    if ("imageUrl" in body) data.imageUrl = body.imageUrl ?? null;

    const updated = await prisma.book.update({ where: { id }, data });
    return NextResponse.json(updated);
  } catch (e) {
    console.error("PUT /api/books/[id] error", e);
    return NextResponse.json({ message: "Erro ao atualizar livro" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseId(params.id);
  if (id === null) return NextResponse.json({ message: "ID inválido" }, { status: 400 });

  try {
    await prisma.book.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("DELETE /api/books/[id] error", e);
    return NextResponse.json({ message: "Erro ao excluir livro" }, { status: 500 });
  }
}