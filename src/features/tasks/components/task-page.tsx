import { useState } from 'react'
import type { TaskStatus } from '../types'
import TaskFilters from './task-filters'
import TaskForm from './task-form'
import TaskList from './task-list'
import TasksLeft from './tasks-left'

const TaskPage = () => {
  const [status, setStatus] = useState<TaskStatus>('all')

  return (
    <main className="mx-auto w-full max-w-xl px-4 pt-6 pb-12 sm:pt-12 lg:max-w-2xl lg:pt-24">
      <header className="mb-6 flex flex-col items-start gap-1 border-b-4 border-ink pb-2 min-[361px]:flex-row min-[361px]:items-end min-[361px]:justify-between">
        <h1 className="text-[clamp(2rem,6vw+1rem,3.5rem)] leading-none font-bold tracking-tighter">
          Tasks
        </h1>
        <TasksLeft />
      </header>

      <TaskForm />
      <TaskFilters value={status} onChange={setStatus} />
      <TaskList status={status} />
    </main>
  )
}

export default TaskPage
