"use client"

export default function Footer() {
  return (
    <footer className="bg-gradient-card border-t mt-97">
  <div className="max-w-6xl mx-auto px-8 py-6">
    <div className="flex flex-col md:flex-row justify-between gap-8">
      {/* Logo + descrição */}
      <div className="max-w-md space-y-3">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-pokeball rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-card rounded-full"></div>
          </div>
          <span className="text-lg font-bold gradient-text">BookShelf</span>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Explore o mundo dos livros com nossa Biblioteca Pessoal moderna.  
          Descubra informações detalhadas sobre suas obras favoritas e gerencie sua coleção de forma simples e organizada.
        </p>
      </div>

      {/* Sobre */}
      <div>
        <h3 className="font-semibold text-foreground mb-2">Sobre</h3>
        <p className="text-sm text-muted-foreground">
          Desenvolvido com Next.js, React, TypeScript e Tailwind CSS.
        </p>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="mt-6 pt-6 border-t border-border/50 flex justify-between text-sm text-muted-foreground">
      <p>© 2025 Desenvolve.</p>
    </div>
  </div>
</footer>

  );
};