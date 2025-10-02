import { NextRequest, NextResponse } from 'next/server';
import { getBooks, getGenres, createBook } from "../../../lib/db";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const search = url.searchParams.get('search') ?? undefined;
  const genre = url.searchParams.get('genre') ?? undefined;
  const page = Number(url.searchParams.get('page') ?? '1');
  const pageSize = Number(url.searchParams.get('pageSize') ?? '12');

  const data = await getBooks({ search, genre, page, pageSize });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  
  const created = await createBook({
    title: body.title,
    author: body.author,
    genre: body.genre,
    description: body.description
  });
  return NextResponse.json(created, { status: 201 });
}
