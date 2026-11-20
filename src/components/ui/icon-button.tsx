import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

const tones = {
  accent: "hover:text-accent",
  danger: "hover:text-danger",
};

interface IconButtonProps extends ComponentProps<"button"> {
  "aria-label": string;
  tone?: keyof typeof tones;
}

export function IconButton({
  tone = "accent",
  type = "button",
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex size-11 cursor-pointer items-center justify-center text-muted transition disabled:cursor-wait",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
