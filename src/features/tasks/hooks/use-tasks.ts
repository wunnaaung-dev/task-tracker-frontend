import { useQuery } from '@tanstack/react-query'
import { fetchTasks } from '../api/tasks-api'
import type { TaskStatus } from '../types'

export const taskKeys = {
  all: ['tasks'] as const,
  list: (status: TaskStatus) => ['tasks', status] as const,
}

export function useTasks(status: TaskStatus) {
  return useQuery({
    queryKey: taskKeys.list(status),
    queryFn: () => fetchTasks(status),
  })
}