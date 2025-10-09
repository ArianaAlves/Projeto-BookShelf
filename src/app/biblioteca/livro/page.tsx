"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import StarRating from "@/components/Star";
import Image from "next/image";

const livros = [ 
  { id: 1, titulo: "A Cidade do Sol", autor: "Khaled Hosseini", capa: "/cidade-do-sol.jpg", genero: "Drama", ano: 2007, rating: 5, sinopse: "Uma emocionante narrativa sobre a vida de duas mulheres afegãs, Mariam e Laila, cujas histórias se entrelaçam em meio a um Afeganistão devastado pela guerra e pela opressão.", }, 
  { id: 2, titulo: "Hamlet", autor: "William Shakespeare", capa: "/hamlet.png", genero: "Tragédia", ano: 1600, rating: 5, sinopse: "Após a morte misteriosa de seu pai, o príncipe Hamlet retorna à Dinamarca e descobre que seu tio Cláudio assumiu o trono e se casou com sua mãe. Quando o fantasma do rei revela que foi assassinado por Cláudio, Hamlet embarca numa jornada de vingança, mergulhando em dilemas morais, loucura e tragédia.", }, 
  { id: 3, titulo: "A Menina que Roubava Livros", autor: "Markus Zusak", capa: "/menina-que-roubava-livros.jpg", genero: "Drama", ano: 2005, rating: 5, sinopse: "Durante a Segunda Guerra Mundial, na Alemanha nazista, a jovem Liesel Meminger encontra consolo nos livros que rouba e lê. Narrada pela Morte, a história acompanha sua vida com a família adotiva, sua amizade com um judeu escondido no porão e sua luta para sobreviver em meio ao horror da guerra — tudo isso guiada pelo poder transformador das palavras.", }, 
  { id: 4, titulo: "Verão de Lenço Vermelho", autor: "Elena Malíssova e Katerina Silvánova ", capa: "/verao-lenco-vermelho.jpg", genero: "Romance", ano: 2024, rating: 5, sinopse: "Na União Soviética dos anos 1980, dois adolescentes vivem um romance proibido durante um verão inesquecível no acampamento Andorinha. Vinte anos depois, Iura retorna ao local em busca das memórias de seu primeiro amor — Volódia — e de tudo o que aquele lenço vermelho representou: amizade, descoberta, dor e coragem para ser quem se é.", }, 
  { id: 5, titulo: "Memórias do Subsolo", autor: "Fiódor Dostoiévski", capa: "/memorias-do-subsolo.jpg", genero: "Filosofia", ano: 1824, rating: 5, sinopse: "Neste clássico de Fiódor Dostoiévski, um homem amargurado e recluso narra suas reflexões e memórias, mergulhando nas profundezas da própria consciência. Dividido entre teoria e prática, o livro revela um protagonista que desafia a lógica, rejeita convenções sociais e se sabota em suas relações, expondo a complexidade da alma humana e o conflito entre razão e livre-arbítrio.", }, 
  { id: 6, titulo: "Crime e Castigo", autor: "Fiódor Dostoiévski", capa: "/crime-e-castigo.jpg", genero: "Romance Psicológico", ano: 1866, rating: 5, sinopse: "Raskólnikov, um jovem estudante pobre de São Petersburgo, comete um assassinato acreditando que pessoas superiores têm o direito de transgredir a lei por um bem maior. No entanto, após o crime, ele é consumido pela culpa e mergulha em um intenso conflito psicológico e moral, que o leva a buscar redenção.", }, 
  { id: 7, titulo: "Razão e Sensibilidade", autor: "Jane Austen", capa: "/razao-e-sensibilidade.png", genero: "Romance", ano: 1811, rating: 4, sinopse: "Neste clássico de Jane Austen, as irmãs Elinor e Marianne Dashwood enfrentam os desafios do amor, da perda e das convenções sociais após a morte de seu pai. Enquanto Elinor age com racionalidade, Marianne se entrega às emoções. A história acompanha suas jornadas distintas em busca de felicidade, revelando o equilíbrio entre razão e sentimento em uma sociedade regida por aparências e interesses.", }, ];

export default function LivroPage({ searchParams }: { searchParams: { id?: string } }) {
  const router = useRouter();
  const id = Number(searchParams?.id);
  const livro = livros.find((l) => l.id === id);

  if (!livro) {
    return <div className="p-6">Livro não encontrado.</div>;
  }
  const handleEdit = () => {
    router.push(`/editar/${livro.id}`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Capa do livro */}
        <div className="md:w-1/3 flex justify-center items-center bg-gray-100 p-6">
          <Image
            src={livro.capa || "/fallback.jpg"}
            alt={livro.titulo}
            width={160}
            height={240}
            className="object-cover rounded shadow"
          />
        </div>

        {/* Informações do livro */}
        <div className="w-full max-w-3xl mx-auto bg-gray-50 rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="relative h-40 flex items-center justify-center">
            <Image
              src="/banner.jpg"
              alt="Banner"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-800/60 via-indigo-600/40 to-transparent"></div>

            <h1 className="relative z-10 text-3xl font-extrabold bg-clip-text bg-gradient-to-r text-white text-center px-4">
              {livro.titulo}
            </h1>
          </div>

          {/* Conteúdo principal */}
          <div className="p-6 grid md:grid-cols-2 gap-6">
            {/* Lado esquerdo - informações */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <h2 className="text-sm uppercase font-semibold text-gray-600 mb-2">
                Informações
              </h2>
              <p className="text-gray-700">
                <span className="font-medium text-gray-900">Autor:</span>{" "}
                {livro.autor}
              </p>
              <p className="text-gray-700">
                <span className="font-medium text-gray-900">Gênero:</span>{" "}
                {livro.genero}
              </p>
              <p className="text-gray-700">
                <span className="font-medium text-gray-900">Ano:</span>{" "}
                {livro.ano}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-medium text-gray-900">Nota:</span>
                <StarRating rating={livro.rating} />
              </div>
            </div>

            {/* Lado direito - sinopse */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <h2 className="text-sm uppercase font-semibold text-gray-600 mb-2">
                Sinopse
              </h2>
              <p className="text-gray-700 text-justify text-sm leading-relaxed">
                {livro.sinopse}
              </p>
            </div>
          </div>

          {/* Rodapé */}
          <div className="flex justify-center gap-3 py-4 border-t border-gray-200 bg-white">
            <button
              onClick={handleEdit}
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-purple-400 via-purple-500 to-indigo-500 hover:opacity-90 transition"
            >
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}