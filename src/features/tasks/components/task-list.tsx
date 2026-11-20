import { getErrorMessage } from "@/lib/api-client";
import { useTasks } from "../hooks/use-tasks";
import type { TaskStatus } from "../types";
import TaskItem from "./task-item";
import { Spinner } from "@/components/ui/spinner";

const EMPTY_MESSAGE: Record<TaskStatus, string> = {
  all: "No tasks yet. Add your first one above.",
  active: "Nothing left to do.",
  completed: "No completed tasks yet.",
};

interface TaskListProps {
  status: TaskStatus;
}

const TaskList = ({ status }: TaskListProps) => {
  const { data: tasks, isPending, isError, error, refetch } = useTasks(status);

  if (isPending) {
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-muted">
        <Spinner size="lg" label="Loading tasks" className="text-accent" />
        <p
          aria-hidden="true"
          className="text-xs font-bold tracking-widest uppercase"
        >
          Loading tasks
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        role="alert"
        className="border-l-3 border-danger py-2 pl-2 text-sm text-danger"
      >
        <p>{getErrorMessage(error)}</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-2 cursor-pointer font-bold text-ink underline underline-offset-4"
        >
          Try again
        </button>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <p className="py-8 text-center text-muted">{EMPTY_MESSAGE[status]}</p>
    );
  }

  return (
    <ul className="border-t border-ink">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};

export default TaskList;
