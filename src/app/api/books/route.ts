import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma"; // src/app/api/books/route.ts -> src/lib/prisma.ts

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || undefined;
    const genre = searchParams.get("genre") || undefined;
    const page = Number(searchParams.get("page") || 1);
    const pageSize = Number(searchParams.get("pageSize") || 12);

    const where: any = {};
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { author: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }
    if (genre && genre !== "Todos") where.genre = genre;

    const [items, total] = await Promise.all([
      prisma.book.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.book.count({ where }),
    ]);

    return NextResponse.json({ items, total, page, pageSize });
  } catch (e) {
    console.error("GET /api/books error", e);
    return NextResponse.json({ message: "Erro ao buscar livros" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = {
      title: String(body.title ?? "").trim(),
      author: String(body.author ?? "").trim(),
      genre: body.genre ?? null,
      description: body.description ?? null,
      year: body.year ?? null,
      rating: body.rating ?? null,
      imageUrl: body.imageUrl ?? null,
    };
    if (!data.title || !data.author) {
      return NextResponse.json({ message: "title & author required" }, { status: 400 });
    }
    const created = await prisma.book.create({ data });
    return NextResponse.json(created, { status: 201 });
  } catch (e) {
    console.error("POST /api/books error", e);
    return NextResponse.json({ message: "Erro ao criar livro" }, { status: 500 });
  }
}