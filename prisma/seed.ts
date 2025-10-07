// prisma/seed.ts
// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import { books as seedBooks } from "../src/app/data/books";

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando o processo de seed...");
  await prisma.book.deleteMany({});
  console.log("Base de dados limpa.");

  for (const book of seedBooks) {
    await prisma.book.create({
      data: {
        title: book.title,
        author: book.author,
        genre: book.genre,
        year: book.year,
        rating: book.rating,
        // Mapeamento direto porque os nomes agora são iguais
        cover: book.cover,
        synopsis: book.synopsis,
      },
    });
  }
  console.log(`✅ ${seedBooks.length} livros foram inseridos com sucesso.`);
}

main()
  .catch((e) => {
    console.error("Ocorreu um erro durante o seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });