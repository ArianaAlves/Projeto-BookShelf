import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Bookshelf",
  description: "Biblioteca Pessoal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative">
        {/* Background decorativo biblioteca.png em todas as páginas */}
        <div
          aria-hidden="true"
          className="fixed inset-0 -z-30 pointer-events-none select-none"
          style={{
            backgroundImage: 'url(/biblioteca.png)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            opacity: 0.40
          }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
