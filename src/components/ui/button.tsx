import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { Spinner } from "./spinner";

const variants = {
  primary:
    "border-accent bg-accent text-on-accent hover:border-ink hover:bg-ink hover:text-paper disabled:border-line disabled:bg-transparent disabled:text-muted",
  secondary:
    "border-ink bg-transparent text-ink hover:bg-ink hover:text-paper disabled:border-line disabled:text-muted",
  danger:
    "border-danger bg-danger text-on-accent hover:border-ink hover:bg-ink hover:text-paper disabled:border-line disabled:bg-transparent disabled:text-muted",
};

interface ButtonProps extends ComponentProps<"button"> {
  variant?: keyof typeof variants;
  isLoading?: boolean;
}

export function Button({
  variant = "primary",
  type = "button",
  isLoading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 border px-6 font-bold transition-colors disabled:cursor-not-allowed",
        variants[variant],
        className,
      )}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading && <Spinner size="sm" decorative />}
      {children}
    </button>
  );
}
