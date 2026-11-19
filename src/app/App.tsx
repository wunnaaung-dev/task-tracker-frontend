import TaskPage from '@/features/tasks/components/task-page'
import { Providers } from './providers'

export default function App() {
  return (
    <Providers>
      <TaskPage />
    </Providers>
  )
}