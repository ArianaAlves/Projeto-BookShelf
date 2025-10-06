// app/api/categories/route.ts
import { NextResponse } from 'next/server';
import { books } from '../../data/books'; // Importamos a nossa lista de livros

// GET /api/categories - Listar todos os géneros únicos
export async function GET() {
  try {
    // Usamos um Set para garantir que cada género apareça apenas uma vez
    const allGenres = new Set(books.map(book => book.genre).filter(Boolean));

    // Convertemos o Set de volta para um array
    const uniqueGenres = Array.from(allGenres);

    return NextResponse.json(uniqueGenres);
  } catch (error) {
    console.error('Erro ao buscar géneros:', error);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}