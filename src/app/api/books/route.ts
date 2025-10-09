import { NextResponse } from 'next/server';
import { books } from '../../data/books'; // Verifique se o caminho do import está correto

// Força a execução dinâmica dessa rota
export const dynamic = 'force-dynamic';

export async function GET() {
  // Se o array de livros estiver vazio ou com problemas, a resposta será vazia.
  // Vamos garantir que estamos retornando algo.
  if (!books) {
    return NextResponse.json({ message: "Dados não encontrados" }, { status: 500 });
  }
  
  return NextResponse.json(books);
}