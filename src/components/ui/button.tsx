import clsx from "clsx";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
};

export function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
  const sizeClass =
    size === "sm"
      ? "text-sm px-2 py-1"
      : size === "lg"
      ? "text-lg px-6 py-3"
      : "px-4 py-2"; // md por padrão

  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        {
          "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500": variant === "primary",
          "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-400": variant === "ghost",
          // CORREÇÃO: Usando classes padrão do Tailwind para a cor vermelha.
          "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500": variant === "danger",
        },
        sizeClass,
        className
      )}
      {...props}
    />
  );
}