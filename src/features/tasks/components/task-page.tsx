import { useState } from 'react'
import type { TaskStatus } from '../types'
import TaskFilters from './task-filters'
import TaskForm from './task-form'
import TaskList from './task-list'
import TasksLeft from './tasks-left'

const TaskPage = () => {
  const [status, setStatus] = useState<TaskStatus>('all')

  return (
    <main className="mx-auto flex h-dvh w-full max-w-xl flex-col px-4 pt-6 pb-6 sm:pt-12 lg:max-w-2xl lg:pt-24 lg:pb-12">
      <header className="mb-6 flex shrink-0 flex-col items-start gap-1 border-b-4 border-ink pb-2 min-[361px]:flex-row min-[361px]:items-end min-[361px]:justify-between">
        <h1 className="text-[clamp(2rem,6vw+1rem,3.5rem)] leading-none font-bold tracking-tighter">
          Tasks
        </h1>
        <TasksLeft />
      </header>

      <div className="shrink-0">
        <TaskForm />
        <TaskFilters value={status} onChange={setStatus} />
      </div>

      <section
        aria-label="Task list"
        className="scrollbar-swiss min-h-40 flex-1 overflow-y-auto overscroll-contain scrollbar-gutter-stable"
      >
        <TaskList status={status} />
      </section>
    </main>
  )
}

export default TaskPage