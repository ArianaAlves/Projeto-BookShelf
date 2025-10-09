// src/index.ts
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // Usando um ID simples que funciona com o schema atual
  const bookId = Date.now().toString();
  
  const book = await prisma.book.create({
    data: {
      id: bookId,
      title: "Livro de Teste",
      author: "Autor de Teste",
      year: 2024,
      rating: 4.5,
    },
  });

  console.log("Novo livro:", book);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
