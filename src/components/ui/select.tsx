import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'

export interface SelectOption<T extends string> {
  value: T
  label: string
}

interface SelectProps<T extends string> {
  label: string
  hideLabel?: boolean 
  value: T
  options: SelectOption<T>[]
  onChange: (value: T) => void
  className?: string
}


export function Select<T extends string>({
  label,
  hideLabel = false,
  value,
  options,
  onChange,
  className,
}: SelectProps<T>) {
  const id = useId()
  const labelId = `${id}-label`
  const listboxId = `${id}-listbox`
  const optionId = (index: number) => `${id}-option-${index}`

  const rootRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const selectedIndex = Math.max(
    options.findIndex((option) => option.value === value),
    0,
  )

  const open = () => {
    setActiveIndex(selectedIndex)
    setIsOpen(true)
  }

  const close = () => setIsOpen(false)

  const choose = (index: number) => {
    onChange(options[index].value)
    close()
  }

  useEffect(() => {
    if (!isOpen) return
    const handlePointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close()
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [isOpen])

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = options.length - 1

    if (!isOpen) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault()
        open()
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActiveIndex((i) => Math.min(i + 1, last))
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveIndex((i) => Math.max(i - 1, 0))
        break
      case 'Home':
        e.preventDefault()
        setActiveIndex(0)
        break
      case 'End':
        e.preventDefault()
        setActiveIndex(last)
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        choose(activeIndex)
        break
      case 'Escape':
        e.preventDefault()
        e.stopPropagation()
        close()
        break
      case 'Tab':
        close()
        break
    }
  }

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <span
        id={labelId}
        className={cn(
          'mb-1 block text-xs font-bold tracking-widest text-muted uppercase',
          hideLabel && 'sr-only',
        )}
      >
        {label}
      </span>

      <button
        type="button"
        role="combobox"
        aria-labelledby={labelId}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-expanded={isOpen}
        aria-activedescendant={isOpen ? optionId(activeIndex) : undefined}
        onClick={() => (isOpen ? close() : open())}
        onKeyDown={handleKeyDown}
        className={cn(
          'flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 border bg-paper px-4 text-left',
          isOpen ? 'border-accent outline-2 outline-accent' : 'border-ink',
        )}
      >
        <span>{options[selectedIndex]?.label}</span>
        <ChevronDown
          className={cn('size-4 shrink-0 text-muted transition-transform', isOpen && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={labelId}
          className="absolute top-full left-0 z-10 mt-1 w-full border-2 border-ink bg-paper py-1"
        >
          {options.map((option, index) => {
            const isSelected = index === selectedIndex
            const isActive = index === activeIndex
            return (
              <li
                key={option.value}
                id={optionId(index)}
                role="option"
                aria-selected={isSelected}
                onPointerEnter={() => setActiveIndex(index)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(index)}
                className={cn(
                  'flex min-h-10 cursor-pointer items-center justify-between gap-3 px-4 select-none',
                  isActive && 'bg-ink text-paper',
                  isSelected && 'font-bold',
                )}
              >
                {option.label}
                {isSelected && <Check className="size-4" aria-hidden="true" />}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}