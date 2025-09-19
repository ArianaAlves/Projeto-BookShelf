import { Card } from "../components/ui/card";

export default function Dashboard() {
  return (
    <div className="grid gap-6">
      <Card>
        <h2 className="text-xl font-semibold">Bem-vindo ao BookShelf</h2>
        <p className="mt-2 text-sm text-gray-600">
          Estrutura inicial configurada com Next.js 15, React 19, TypeScript, TailwindCSS e shadcn/ui.
        </p>
      </Card>
    </div>
  );
}