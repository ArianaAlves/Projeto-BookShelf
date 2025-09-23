
export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
  <div className="bg-gradient-to-r from-indigo-300 via-purple-300 to-purple-200 p-6 rounded-xl shadow">

    <h2 className="text-xl font-semibold text-white">Bem-vindo ao BookShelf</h2>
    <p className="text-gray-100 mt-2 text-sm">
      Use o menu acima para navegar. Você pode começar adicionando um novo livro ou explorando sua biblioteca atual.
    </p>
  </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total de livros */}
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Total de livros</p>
          <h2 className="text-2xl font-bold">0</h2>
          <p className="text-xs text-gray-400">na biblioteca</p>
        </div>

        {/* Lendo agora */}
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Lendo agora</p>
          <h2 className="text-2xl font-bold">0</h2>
          <p className="text-xs text-gray-400">em progresso</p>
        </div>

        {/* Lidos */}
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Lidos</p>
          <h2 className="text-2xl font-bold">0</h2>
          <p className="text-xs text-gray-400">finalizado</p>
        </div>

        {/* Páginas lidas */}
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Páginas lidas</p>
          <h2 className="text-2xl font-bold">000</h2>
          <p className="text-xs text-gray-400">acumulado</p>
        </div>
      </div>
    </div>
  );
}
