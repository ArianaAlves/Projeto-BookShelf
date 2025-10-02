import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Buscar vários livros (com filtros)
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

// 🔑 Buscar livro por ID (para página [id]/page.tsx)
export async function getBookById(id: string) {
  return prisma.book.findUnique({
    where: { id },
  });
}

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
