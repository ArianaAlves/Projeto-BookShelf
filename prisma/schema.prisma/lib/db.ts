import prisma from './prismadb';

type GetBooksParams = {
  search?: string;
  genre?: string;
  page?: number;
  pageSize?: number;
};

export async function getBooks({ search, genre, page = 1, pageSize = 12 }: GetBooksParams) {
  const where: any = {};
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { author: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } }
    ];
  }
  if (genre) where.genre = genre;

  const [items, total] = await Promise.all([
    prisma.book.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize
    }),
    prisma.book.count({ where })
  ]);

  return { items, total, page, pageSize };
}

export async function getBookById(id: string) {
  return prisma.book.findUnique({ where: { id } });
}

export async function createBook(data: { title: string; author: string; genre?: string; description?: string }) {
  return prisma.book.create({ data });
}

export async function updateBook(id: string, data: Partial<{ title:string; author:string; genre:string; description:string }>) {
  return prisma.book.update({ where: { id }, data });
}

export async function deleteBook(id: string) {
  return prisma.book.delete({ where: { id } });
}

export async function getGenres() {

 return prisma.book.findMany({
  distinct: ['genre'],
  select: { genre: true }
}).then((rows: { genre: string | null }[]) =>
  rows.map((r) => r.genre).filter((g): g is string => Boolean(g))
);
}
