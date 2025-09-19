import "./globals.css";
import ThemeProvider from "../components/design/theme-provider";

export const metadata = {
  title: "BookShelf",
  description: "Gerencie sua biblioteca pessoal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeProvider>
          <main className="container mx-auto p-4">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}