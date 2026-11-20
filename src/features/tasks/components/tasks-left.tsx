import { useTasks } from '../hooks/use-tasks'

const TasksLeft = () => {
  const { data } = useTasks('active')
  if (!data) return null

  const count = data.length
  return (
    <p className="text-sm whitespace-nowrap text-muted" aria-live="polite">
      {count} {count === 1 ? 'task' : 'tasks'} left
    </p>
  )
}

export default TasksLeft
