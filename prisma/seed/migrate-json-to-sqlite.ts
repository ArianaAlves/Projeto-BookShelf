// prisma/seed/migrate-json-to-sqlite.ts

// Tenta importar o client gerado diretamente (às vezes o pacote @prisma/client
// não resolve corretamente em setups com geração customizada). Se falhar,
// faz fallback para '@prisma/client'.
let PrismaClientImport: any;
try {
  // Caminho relativo para o client gerado (output = ../generated/prisma)
  PrismaClientImport = require('../generated/prisma').PrismaClient;
} catch (e) {
  PrismaClientImport = require('@prisma/client').PrismaClient;
}
import type { Prisma } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

// --- CONFIGURAÇÃO DE ARQUIVOS ---
// Resolve o caminho para a pasta 'data' que está um nível acima (../../data)
const DATA_DIR = path.resolve(__dirname, '../../data');
const OLD_BOOKS_PATH = path.join(DATA_DIR, 'books.json');
const OLD_GENRES_PATH = path.join(DATA_DIR, 'genres.json');
const BACKUP_SUFFIX = '-DEPRECATED.json'; // Sufixo de backup (Requisito 1.8)

// Inicializa o Prisma Client
const prisma = new PrismaClientImport();

// --- INTERFACE PARA DADOS ANTIGOS (JSON) ---
// Define a estrutura esperada do seu array JSON de livros
interface OldBook {
  id: string; 
  title: string;
  author: string;
  genre: string; // O nome do gênero
  year?: number; // Opcional, pois pode ser null no JSON
  rating?: number; // Opcional
  cover?: string; // Opcional
  // Seus livros têm titulo/capa, mas aqui usaremos title/cover para mapear o schema.prisma
}

// --- FUNÇÃO PRINCIPAL DE MIGRAÇÃO ---
async function migrateJsonToSqlite() {
  console.log('--- Iniciando Migração JSON -> SQLite (Prisma) ---');

  // 1. VERIFICAÇÃO E LEITURA DE DADOS JSON
  if (!fs.existsSync(OLD_BOOKS_PATH) || !fs.existsSync(OLD_GENRES_PATH)) {
    console.warn('⚠️ Arquivos JSON de dados não encontrados em /data. Certifique-se de que estão na pasta raiz e têm o nome books.json e genres.json.');
    return;
  }

  const oldBooks: OldBook[] = JSON.parse(fs.readFileSync(OLD_BOOKS_PATH, 'utf-8'));
  const oldGenres: string[] = JSON.parse(fs.readFileSync(OLD_GENRES_PATH, 'utf-8'));
  
  console.log(`- Encontrados ${oldBooks.length} livros e ${oldGenres.length} gêneros para migrar.`);

  // 2. ESTRATÉGIA DE BACKUP (1.8)
  try {
    console.log('- Criando backup (renomeando com -DEPRECATED)...');
    fs.renameSync(OLD_BOOKS_PATH, OLD_BOOKS_PATH.replace('.json', BACKUP_SUFFIX));
    fs.renameSync(OLD_GENRES_PATH, OLD_GENRES_PATH.replace('.json', BACKUP_SUFFIX));
    console.log('✅ Backup concluído. Arquivos originais renomeados.');
  } catch (error) {
    console.error('❌ Falha ao criar backup. Verifique as permissões de pasta. Abortando migração.', error);
    return;
  }

  // 3. INSERÇÃO DE DADOS NO BANCO (com transação)
  try {
    // Usamos $transaction para garantir que, se algo falhar, nada seja salvo (Rollback)
  await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      
      // 3.1. INSERÇÃO DE GÊNEROS
      const genreData = oldGenres.map(name => ({ name }));
      await tx.genre.createMany({
        data: genreData,
        skipDuplicates: true, // Ignora se o gênero já foi inserido
      });
      // Busca os gêneros criados para obter seus IDs (necessário para a relação do livro)
  const existingGenres: { id: string; name: string }[] = await tx.genre.findMany();

      // 3.2. INSERÇÃO DE LIVROS (Mapeamento do Modelo Expandido)
      const bookData = oldBooks.map(book => {
        // Encontra o ID do Gênero
        const genreRecord = existingGenres.find(g => g.name === book.genre);

        return {
          // Campos Migrados e Preservados
          id: book.id, // Preservando IDs originais (1.7)
          title: book.title,
          author: book.author,
          year: book.year,
          rating: book.rating,
          cover: book.cover,

          // Mapeamento de Gênero
          genreName: book.genre, 
          genreId: genreRecord?.id, // ID da chave estrangeira

          // Novos Campos e Valores Padrão (Requisito 1.4/1.7)
          synopsis: `Sinopse de ${book.title} (migrada do JSON)`, // Valor padrão
          // Se o enum ReadingStatus não estiver disponível pelo client gerado,
          // usamos o valor literal correspondente. Cast para any para evitar erro de tipagem
          status: 'QUERO_LER' as any, // Padrão
          currentPage: 0, // Padrão
          isbn: null, 
          notes: null, 
          pages: null, // Não existia no JSON

          createdAt: new Date(), 
          updatedAt: new Date(),
        }
      });
      
      const createdBooks = await tx.book.createMany({
        data: bookData,
        skipDuplicates: true,
      });
      console.log(`✅ ${createdBooks.count} livros inseridos no banco de dados.`);
    });
    
    console.log('--- Migração Concluída com Sucesso! ---');

  } catch (error) {
    console.error('❌ ERRO CRÍTICO NA TRANSAÇÃO DE MIGRAÇÃO.', error);
    console.log('**Atenção:** Como houve falha, o banco de dados pode estar inconsistente. Consulte a documentação do projeto (1.8) e faça a **reversão manual** do backup (renomeando os arquivos *DEPRECATED.json de volta para .json).');
  } finally {
    // Garante que a conexão com o banco de dados seja fechada
    await prisma.$disconnect();
  }
}

migrateJsonToSqlite();
