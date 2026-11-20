import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'

interface ToggleButtonProps extends Omit<ComponentProps<'button'>, 'aria-pressed'> {
  pressed: boolean
}

export function ToggleButton({ pressed, type = 'button', className, ...props }: ToggleButtonProps) {
  return (
    <button
      type={type}
      aria-pressed={pressed}
      className={cn(
        'min-h-11 cursor-pointer border-b-3 border-transparent text-xs font-bold tracking-widest text-muted uppercase transition-colors hover:text-ink aria-pressed:border-accent aria-pressed:text-ink',
        className,
      )}
      {...props}
    />
  )
}