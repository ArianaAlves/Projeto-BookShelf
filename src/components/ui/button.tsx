import clsx from "clsx";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg"; // adiciona size
};

export function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
  // Classes de tamanho
  const sizeClass =
    size === "sm"
      ? "text-sm px-2 py-1"
      : size === "lg"
      ? "text-lg px-6 py-3"
      : "text-md px-4 py-2"; // md por padrão

  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-2xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
        variant === "primary" && "bg-primary-500 text-white hover:bg-primary-600",
        variant === "ghost" && "bg-transparent border border-gray-200 text-gray-700",
        variant === "danger" && "bg-danger text-white hover:bg-red-600",
        sizeClass, // aplica tamanho
        className
      )}
      {...props}
    />
  );
}
