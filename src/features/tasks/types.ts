export type Priority = 'low' | 'medium' | 'high'
export type TaskStatus = 'all' | 'active' | 'completed'

export interface Task {
  id: string
  title: string
  completed: boolean
  priority: Priority
  createdAt: string
}

export interface CreateTaskInput {
  title: string
  priority?: Priority
}

export type UpdateTaskInput = Partial<Pick<Task, 'title' | 'completed' | 'priority'>>