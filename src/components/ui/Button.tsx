import { cn } from "@/lib/utils"; // Bunu birazdan oluşturacağız
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
}

export const Button = ({
  className,
  variant = "primary",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "px-6 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 active:scale-95";

  const variants = {
    primary:
      "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/20",
    outline:
      "border border-slate-200 text-slate-700 hover:border-red-600 hover:text-red-600 bg-transparent",
    ghost: "text-slate-600 hover:text-red-600 bg-transparent hover:bg-red-50",
  };

  // className birleştirme işlemi için basit bir mantık (clsx olmadan manuel çözüm şimdilik)
  // Not: Eğer lib/utils hatası alırsan aşağıda düzelteceğiz.
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className || ""}`}
      {...props}
    />
  );
};
