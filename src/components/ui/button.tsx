import clsx from "clsx";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
        variant === "primary" && "bg-primary-500 text-white hover:bg-primary-600",
        variant === "ghost" && "bg-transparent border border-gray-200 text-gray-700",
        variant === "danger" && "bg-danger text-white hover:bg-red-600",
        className
      )}
      {...props}
    />
  );
}