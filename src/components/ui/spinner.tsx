import { cn } from "@/lib/cn";

const sizes = {
  sm: "size-4 border-2",
  md: "size-6 border-2",
  lg: "size-10 border-3",
};

interface SpinnerProps {
  size?: keyof typeof sizes;
  label?: string;
  decorative?: boolean;
  className?: string;
}

export function Spinner({
  size = "md",
  label = "Loading",
  decorative = false,
  className,
}: SpinnerProps) {
  return (
    <div
      role={decorative ? undefined : "status"}
      aria-hidden={decorative || undefined}
      className={cn("inline-flex shrink-0 items-center", className)}
    >
      <span
        className={cn(
          "block rounded-full border-current/25 border-t-current motion-safe:animate-spin motion-reduce:animate-pulse",
          sizes[size],
        )}
      />
      {!decorative && <span className="sr-only">{label}</span>}
    </div>
  );
}
