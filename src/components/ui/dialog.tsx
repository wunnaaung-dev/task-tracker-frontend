import { useEffect, useId, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface DialogProps {
  title: string
  onClose: () => void
  children: ReactNode
  className?: string
}

export function Dialog({ title, onClose, children, className }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    dialogRef.current?.showModal()
  }, [])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(e) => {
        e.preventDefault() 
        onClose()
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose() 
      }}
      className={cn(
        'm-auto w-[min(28rem,calc(100%-2rem))] border-2 border-ink bg-paper p-6 text-ink backdrop:bg-black/50',
        className,
      )}
    >
      <h2 id={titleId} className="mb-4 border-b-4 border-ink pb-2 text-2xl font-bold tracking-tight">
        {title}
      </h2>
      {children}
    </dialog>
  )
}