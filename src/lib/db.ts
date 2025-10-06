// src/lib/db.ts
import { prisma } from "./prisma";

export async function getBooks({
  search,
  genre,
  page = 1,
  pageSize = 12,
}: {
  search?: string;
  genre?: string;
  page?: number;
  pageSize?: number;
}) {
  const where: any = {};
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { author: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }
  if (genre) where.genre = genre;

  const [items, total] = await Promise.all([
    prisma.book.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.book.count({ where }),
  ]);

  return { items, total, page, pageSize };
}

export async function getGenres(): Promise<string[]> {
  const genres = await prisma.book.findMany({
    select: { genre: true },
    distinct: ["genre"],
  });
  return genres.map((g) => g.genre).filter(Boolean) as string[];
}

export const createBook = (data: {
  title: string;
  author: string;
  genre?: string | null;
  description?: string | null;
  year?: number | null;
  rating?: number | null;
  imageUrl?: string | null;
}) => prisma.book.create({ data });

export const updateBook = (id: number, data: Partial<{
  title: string;
  author: string;
  genre: string | null;
  description: string | null;
  year: number | null;
  rating: number | null;
  imageUrl: string | null;
}>) => prisma.book.update({ where: { id }, data });

export const deleteBook = (id: number) => prisma.book.delete({ where: { id } });