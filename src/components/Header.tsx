"use client"

import Link from "next/link";
import { ModeToggle } from "../components/ui/darkmode"

export default function Header() {
  return (
    <header className="bg-white border-b dark:bg-black border-gray-200 px-10 py-6 flex justify-between items-center">
  <h1 className="text-2xl font-bold dark:text-white text-gray-800 tracking-tight">BookShelf</h1>
  <nav className="space-x-8 text-base font-medium">
    <ModeToggle />
    <Link href="/" className="text-gray-600 dark:text-white hover:text-gray-900 transition-colors">
      Início
    </Link>
    <Link href="/biblioteca" className="text-gray-600 dark:text-white hover:text-gray-900 transition-colors">
      Biblioteca
    </Link>
    <Link href="/biblioteca/adicionar" className="text-gray-600 dark:text-white hover:text-gray-900 transition-colors">
      Adicionar
    </Link>
  </nav>
</header>

)}