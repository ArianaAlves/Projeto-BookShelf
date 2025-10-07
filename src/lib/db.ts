import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Função para obter livros com filtros e paginação
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
      { synopsis: { contains: search, mode: "insensitive" } },
    ];
  }

  if (genre) {
    where.genre = genre;
  }

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

// Função para obter todos os gêneros únicos
export async function getGenres(): Promise<string[]> {
  const genres = await prisma.book.findMany({
    select: { genre: true },
    distinct: ["genre"],
  });

  return genres.map((g) => g.genre).filter(Boolean) as string[];
}

// Função para criar um novo livro
export const createBook = (data: {
  title: string;
  author: string;
  genre?: string | null;
  description?: string | null;
  synopsis?: string | null;
  year?: number | null;
  rating?: number | null;
  imageUrl?: string | null;
}) => prisma.book.create({ data });

// Função para atualizar um livro existente
export const updateBook = (
  id: number,
  data: Partial<{
    title: string;
    author: string;
    genre: string | null;
    description: string | null;
    synopsis: string | null;
    year: number | null;
    rating: number | null;
    imageUrl: string | null;
  }>
) => prisma.book.update({ where: { id }, data });

// Função para apagar um livro
export const deleteBook = (id: number) =>
  prisma.book.delete({ where: { id } });

// Função para buscar um livro por ID
export const getBookById = (id: number) =>
  prisma.book.findUnique({ where: { id } });