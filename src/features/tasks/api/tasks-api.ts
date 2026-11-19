import { apiClient } from '@/lib/api-client'
import type { CreateTaskInput, Task, TaskStatus, UpdateTaskInput } from '../types'

export async function fetchTasks(status: TaskStatus): Promise<Task[]> {
  const params = status === 'all' ? {} : { status }
  const { data } = await apiClient.get<Task[]>('/tasks', { params })
  return data
}

export async function createTask(input: CreateTaskInput): Promise<Task> {
  const { data } = await apiClient.post<Task>('/tasks', input)
  return data
}

export async function updateTask(id: string, input: UpdateTaskInput): Promise<Task> {
  const { data } = await apiClient.patch<Task>(`/tasks/${id}`, input)
  return data
}

export async function deleteTask(id: string): Promise<void> {
  await apiClient.delete(`/tasks/${id}`)
}