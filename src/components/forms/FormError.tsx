"use client";

import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormErrorProps {
  message?: string;
  className?: string;
}

export function FormError({ message, className }: FormErrorProps) {
  if (!message) return null;

  return (
    <div className={cn("flex items-center gap-2 text-red-600 text-sm mt-1", className)}>
      <AlertCircle size={16} className="shrink-0" />
      <span>{message}</span>
    </div>
  );
}
