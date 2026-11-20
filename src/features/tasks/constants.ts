import type { SelectOption } from '@/components/ui/select'
import type { Priority } from './types'

export const PRIORITY_OPTIONS: SelectOption<Priority>[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
]