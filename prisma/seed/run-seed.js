const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('../../generated/prisma');

const DATA_DIR = path.resolve(__dirname, '../../data');
const OLD_BOOKS_PATH = path.join(DATA_DIR, 'books.json');
const OLD_GENRES_PATH = path.join(DATA_DIR, 'genres.json');
const BACKUP_SUFFIX = '-DEPRECATED.json';

const prisma = new PrismaClient();

async function run() {
  console.log('Starting JSON -> SQLite migration (JS runner)');
  if (!fs.existsSync(OLD_BOOKS_PATH) || !fs.existsSync(OLD_GENRES_PATH)) {
    console.warn('JSON data files not found in /data');
    return;
  }

  const oldBooks = JSON.parse(fs.readFileSync(OLD_BOOKS_PATH, 'utf-8'));
  const oldGenres = JSON.parse(fs.readFileSync(OLD_GENRES_PATH, 'utf-8'));

  try {
    fs.renameSync(OLD_BOOKS_PATH, OLD_BOOKS_PATH.replace('.json', BACKUP_SUFFIX));
    fs.renameSync(OLD_GENRES_PATH, OLD_GENRES_PATH.replace('.json', BACKUP_SUFFIX));
    console.log('Backups created.');
  } catch (err) {
    console.error('Failed to create backups', err);
    return;
  }

  try {
    await prisma.$transaction(async (tx) => {
      const genreData = oldGenres.map((name) => ({ name }));
  await tx.genre.createMany({ data: genreData });
      const existingGenres = await tx.genre.findMany();

      const bookData = oldBooks.map((book) => {
        const genreRecord = existingGenres.find((g) => g.name === book.genre);
        return {
          id: book.id,
          title: book.title,
          author: book.author,
          year: book.year,
          rating: book.rating,
          cover: book.cover,
          genreName: book.genre,
          genreId: genreRecord?.id,
          synopsis: `Sinopse de ${book.title} (migrada do JSON)`,
          status: 'QUERO_LER',
          currentPage: 0,
          isbn: null,
          notes: null,
          pages: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      });

  const created = await tx.book.createMany({ data: bookData });
      console.log(`Inserted ${created.count} books`);
    });
  } catch (err) {
    console.error('Migration transaction failed', err);
  } finally {
    await prisma.$disconnect();
  }
}

run();
