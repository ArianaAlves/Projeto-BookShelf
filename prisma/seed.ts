import { PrismaClient } from "@prisma/client";

// IMPORTA sua fonte real
// caminho relativo: de prisma/ até src/app/data/book.ts
import { books as seedBooks } from "../src/app/data/books";

const prisma = new PrismaClient();

async function main() {
  for (const b of seedBooks) {
    await prisma.book.upsert({
      // usa a UNIQUE composta do schema
      where: { title_author: { title: b.title, author: b.author } },
      update: {
        genre: b.genre ?? null,
        year: b.year ?? null,
        rating: typeof b.rating === "number" ? b.rating : null,
        imageUrl: b.cover ?? null,
        description: (b as any).synopsis ?? null, // mapeia synopsis -> description
      },
      create: {
        title: b.title,
        author: b.author,
        genre: b.genre ?? null,
        year: b.year ?? null,
        rating: typeof b.rating === "number" ? b.rating : null,
        imageUrl: b.cover ?? null,
        description: (b as any).synopsis ?? null,
      },
    });
  }
  console.log("Seed concluído a partir de src/app/data/books.ts");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());