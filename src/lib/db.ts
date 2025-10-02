import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Buscar livros
export const getBooks = async ({
  search,
  genre,
  page = 1,
  pageSize = 12,
}: {
  search?: string;
  genre?: string;
  page?: number;
  pageSize?: number;
}) => {
  const where: any = {};
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { author: { contains: search, mode: "insensitive" } },
    ];
  }
  if (genre) {
    where.genre = genre;
  }

  const items = await prisma.book.findMany({
    where,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const total = await prisma.book.count({ where });

  return { items, total };
};

// Buscar todos os gêneros
export const getGenres = async (): Promise<string[]> => {
  const genres = await prisma.book.findMany({
    select: { genre: true },
    distinct: ["genre"],
  });

  // Tipando g explicitamente
  return genres.map((g: { genre: string | null }) => g.genre).filter(Boolean) as string[];
};

// Outras funções já existentes
export const createBook = async (data: {
  title: string;
  author: string;
  genre?: string;
  description?: string;
}) => {
  return prisma.book.create({ data });
};

export const updateBook = async (id: number, data: any) => {
  return prisma.book.update({ where: { id }, data });
};

export const deleteBook = async (id: number) => {
  return prisma.book.delete({ where: { id } });
};
