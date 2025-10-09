const { PrismaClient } = require('./generated/prisma');

async function checkBooks() {
  const prisma = new PrismaClient();
  
  try {
    const books = await prisma.book.findMany({
      select: { id: true, title: true }
    });
    
    console.log('Books IDs and titles:', books);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkBooks();