export function H1({ children }: { children: React.ReactNode }) {
  return <h1 className="text-3xl font-semibold leading-tight">{children}</h1>;
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="text-base text-gray-600">{children}</p>;
}