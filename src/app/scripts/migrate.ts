// scripts/migrate.ts
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

// Interface para garantir a tipagem do seu JSON antigo
interface OldBook {
  id: string;
  title: string;
  author: string;
  genre: string;
  year: number;
  pages: number;
  rating: number;
  synopsis: string;
  cover: string;
}

async function main() {
  console.log('Iniciando a migração de dados...');

  // 1. Ler os dados do arquivo JSON existente [cite: 63]
  const jsonPath = path.join(__dirname, '..', 'caminho/para/seu/books.json'); // <-- AJUSTE O CAMINHO
  const fileContent = fs.readFileSync(jsonPath, 'utf-8');
  const oldBooks: OldBook[] = JSON.parse(fileContent);

  let createdCount = 0;
  for (const book of oldBooks) {
    try {
      await prisma.book.create({
        data: {
          // 2. Mapear dados antigos para o novo modelo
          id: book.id, // Preservando o ID original [cite: 63]
          title: book.title,
          author: book.author,
          genre: book.genre,
          year: book.year,
          pages: book.pages,
          rating: book.rating,
          synopsis: book.synopsis,
          cover: book.cover,
          // 3. Adicionar valores padrão para os novos campos [cite: 63]
          status: 'QUERO_LER', // Valor padrão [cite: 55]
          currentPage: 0,
        },
      });
      createdCount++;
    } catch (error) {
      console.error(`Erro ao migrar o livro com ID ${book.id}:`, error);
    }
  }

  console.log(`Migração concluída! ${createdCount} de ${oldBooks.length} livros foram inseridos com sucesso.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });