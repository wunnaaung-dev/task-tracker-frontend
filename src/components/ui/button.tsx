import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'

const variants = {
  primary:
    'border-accent bg-accent text-on-accent hover:border-ink hover:bg-ink hover:text-paper disabled:border-line disabled:bg-transparent disabled:text-muted',
  secondary: 'border-ink bg-transparent text-ink hover:bg-ink hover:text-paper disabled:border-line disabled:text-muted',
  danger:
    'border-danger bg-danger text-on-accent hover:border-ink hover:bg-ink hover:text-paper disabled:border-line disabled:bg-transparent disabled:text-muted',
}

interface ButtonProps extends ComponentProps<'button'> {
  variant?: keyof typeof variants
}

export function Button({ variant = 'primary', type = 'button', className, ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'min-h-11 cursor-pointer border px-6 font-bold transition-colors disabled:cursor-not-allowed',
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}