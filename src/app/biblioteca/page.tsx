"use client";
import { useState, useEffect } from "react";
import BookCard from "../../components/BookCard";
import { useRouter } from "next/navigation";

type Livro = {
  id: number;
  titulo: string;
  autor: string;
  capa: string;
  genero: string;
  ano: number;
  rating: number;
};

const livrosOriginais: Livro[] = [
  {
    id: 1,
    titulo: "A Cidade do Sol",
    autor: "Khaled Hosseini",
    capa: "/cidade-do-sol.png",
    genero: "Drama",
    ano: 2007, 
    rating: 5,
  },
  {
    id: 2,
    titulo: "Hamlet",
    autor: "William Shakespeare",
    capa: "/hamlet.png",
    genero: "Tragédia",
    ano: 1600, 
    rating: 5,
  },
  {
    id: 3,
    titulo: "A Menina que Roubava Livros",
    autor: "Markus Zusak",
    capa: "/menina-que-roubava-livros.png",
    genero: "Drama",
    ano: 2005, 
    rating: 5,
  },
  {
    id: 4,
    titulo: "Verão de Lenço Vermelho",
    autor: "Elena Malíssova e Katerina Silvánova ",
    capa: "/verao-lenco-vermelho.png",
    genero: "Romance",
    ano: 2024, 
    rating: 5,
  },
  {
    id: 5,
    titulo: "Memórias do Subsolo",
    autor: "Fiódor Dostoiévski",
    capa: "/memorias-do-subsolo.png",
    genero: "Filosofia",
    ano: 1824, 
    rating: 5,
  },
  {
    id: 6,
    titulo: "Crime e Castigo",
    autor: "Fiódor Dostoiévski",
    capa: "/crime-e-castigo.png",
    genero: "Romance Psicológico",
    ano: 1866, 
    rating: 5,
  },
  {
    id: 7,
    titulo: "Razão e Sensibilidade",
    autor: "Jane Austen",
    capa: "/razao-e-sensibilidade.png",
    genero: "Romance",
    ano: 1811, 
    rating: 4,
  },
];


export default function Biblioteca() {
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("Todos");
  const [livros, setLivros] = useState<Livro[]>(livrosOriginais);
  const [lixeira, setLixeira] = useState<Livro[]>([]);
  const router = useRouter();

  // Carregar do localStorage ao iniciar
  useEffect(() => {
    const excluidos = localStorage.getItem("lixeiraBooks");
    if (excluidos) setLixeira(JSON.parse(excluidos));
    const salvos = localStorage.getItem("livrosBooks");
    if (salvos) setLivros(JSON.parse(salvos));
  }, []);

  // Salvar no localStorage ao alterar
  useEffect(() => {
    localStorage.setItem("lixeiraBooks", JSON.stringify(lixeira));
  }, [lixeira]);
  useEffect(() => {
    localStorage.setItem("livrosBooks", JSON.stringify(livros));
  }, [livros]);

  const livrosFiltrados = livros.filter(
    (livro) =>
      (filtro === "Todos" || livro.genero === filtro) &&
      livro.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  function handleView(id: number) {
    router.push(`/biblioteca/livro?id=${id}`);
  }

  function handleEdit(id: number) {
    router.push(`/biblioteca/editar?id=${id}`);
  }

  function handleDelete(id: number) {
    const livroRemovido = livros.find(l => l.id === id);
    if (!livroRemovido) return;
    setLivros(livros.filter(l => l.id !== id));
    setLixeira([livroRemovido, ...lixeira]);
  }

  function handleRestore(id: number) {
    const livroRestaurado = lixeira.find(l => l.id === id);
    if (!livroRestaurado) return;
    setLixeira(lixeira.filter(l => l.id !== id));
    setLivros([livroRestaurado, ...livros]);
  }

  return (
    <>
    {/* Background decorativo biblioteca.png */}
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
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-indigo-300 via-purple-300 to-purple-200 p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-white">📚 Minha Biblioteca</h1>
        <p className="text-gray-100 mt-2 text-sm">
          Veja, filtre e gerencie seus livros cadastrados.
        </p>
        <br />
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Buscar livro..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full sm:w-64"
        />

        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="Todos">Todos</option>
          <option value="Drama">Drama</option>
          <option value="Tragédia">Tragédia</option>
          <option value="Romance">Romance</option>
          <option value="Filosofia">Filosofia</option>
          <option value="Romance Psicológico">Romance Psicológico</option>
        </select>
      </div>

      {/* Grid de livros */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {livrosFiltrados.map((livro) => (
          <BookCard
            key={livro.id}
            titulo={livro.titulo}
            autor={livro.autor}
            capa={livro.capa}
            genero={livro.genero}
            ano={livro.ano ?? 0}
            avaliacao={livro.rating}
            onView={() => handleView(livro.id)}
            onEdit={() => handleEdit(livro.id)}
            onDelete={() => handleDelete(livro.id)}
          />
        ))}
      </div>
    </div>
    {/* Lixeira no rodapé */}
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      {lixeira.length > 0 && (
        <div className="bg-white shadow-lg rounded-xl px-6 py-4 flex flex-col items-center border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">Lixeira</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5v10.125A2.625 2.625 0 009.375 20.25h5.25a2.625 2.625 0 002.625-2.625V7.5m-12 0h13.5m-10.125 0V5.625A2.625 2.625 0 0110.875 3h2.25a2.625 2.625 0 012.625 2.625V7.5" />
            </svg>
          </div>
          <ul className="max-h-40 overflow-y-auto w-56">
            {lixeira.map(livro => (
              <li key={livro.id} className="flex justify-between items-center py-1 border-b last:border-b-0">
                <span className="truncate max-w-[120px]">{livro.titulo}</span>
                <button
                  className="ml-2 text-xs text-indigo-600 hover:underline"
                  onClick={() => handleRestore(livro.id)}
                >
                  Restaurar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </>
  );
}

