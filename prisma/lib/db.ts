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

// Compatibility wrapper: some parts of the app expect `getBook(id: number)`
export async function getBook(id: number | string) {
  return getBookById(String(id));
}

export async function createBook(data: { title: string; author: string; genre?: string; description?: string }) {
  return prisma.book.create({ data });
}

export async function updateBook(id: string, data: Partial<{ title:string; author:string; genre:string; description:string }>) {
  return prisma.book.update({ where: { id }, data });
}

// Compatibility wrapper for routes passing numeric ids
export async function updateBookById(id: number | string, data: Partial<{ title:string; author:string; genre:string; description:string }>) {
  return updateBook(String(id), data as any);
}

export async function deleteBook(id: string) {
  return prisma.book.delete({ where: { id } });
}

// Compatibility wrapper: delete by numeric id used in some api routes
export async function deleteBookById(id: number | string) {
  return deleteBook(String(id));
}

export async function getGenres() {

 return prisma.book.findMany({
  distinct: ['genre'],
  select: { genre: true }
}).then((rows: { genre: string | null }[]) =>
  rows.map((r) => r.genre).filter((g): g is string => Boolean(g))
);
}
