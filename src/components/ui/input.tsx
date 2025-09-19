export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="w-full rounded-lg border px-3 py-2 text-sm placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-primary-300"
      {...props}
    />
  );
}