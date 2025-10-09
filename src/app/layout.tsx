import "./globals.css";
import { ThemeProvider } from "../components/theme-provider"
import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";


export const metadata: Metadata = {
  title: "Bookshelf",
  description: "Biblioteca Pessoal",
};

export const viewport = {
    width: "device-width",
   initialScale: 1,
   themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" suppressHydrationWarning>
      <body className="relative">
            <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >

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
        </ThemeProvider>
      </body>
    </html>
  );
}
