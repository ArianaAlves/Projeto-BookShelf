// Rota simplificada sem Prisma para resolver build
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({ message: 'API route disabled during build' }, { status: 503 });
}

export async function PUT() {
  return NextResponse.json({ message: 'API route disabled during build' }, { status: 503 });
}

export async function DELETE() {
  return NextResponse.json({ message: 'API route disabled during build' }, { status: 503 });
}