import { useState } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { IconButton } from "@/components/ui/icon-button";
import { getErrorMessage } from "@/lib/api-client";
import { useDeleteTask, useUpdateTask } from "../hooks/use-task-mutations";
import type { Priority, Task } from "../types";
import TaskEditDialog from "./task-edit-dialog";
import { Pencil, Trash2 } from "lucide-react";

const priorityStyle: Record<Priority, string> = {
  high: "font-bold text-danger",
  medium: "font-bold text-muted",
  low: "text-muted",
};

const revealOnHover =
  "focus-visible:opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100 pointer-coarse:opacity-100";

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const isBusy = updateTask.isPending || deleteTask.isPending;

  const closeDeleteDialog = () => {
    setIsConfirmingDelete(false);
    deleteTask.reset();
  };

  const handleDelete = () => {
    deleteTask.mutate(task.id, {
      onSuccess: () => setIsConfirmingDelete(false),
    });
  };

  return (
    <li
      className={`group grid min-h-14 grid-cols-[auto_1fr_auto] items-center gap-x-2 border-b border-line py-2 min-[361px]:grid-cols-[auto_1fr_auto_auto] ${isBusy ? "opacity-50" : ""}`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        disabled={isBusy}
        onChange={() =>
          updateTask.mutate({
            id: task.id,
            input: { completed: !task.completed },
          })
        }
        aria-label={`Mark "${task.title}" as ${task.completed ? "active" : "completed"}`}
        className="mr-2 size-5 cursor-pointer accent-ink disabled:cursor-wait"
      />

      <span
        className={`min-w-0 wrap-anywhere ${task.completed ? "text-muted line-through" : ""}`}
      >
        {task.title}
      </span>

      <span
        className={`col-start-2 row-start-2 text-xs tracking-widest uppercase min-[361px]:col-auto min-[361px]:row-auto ${priorityStyle[task.priority]}`}
      >
        {task.priority}
      </span>

      <div className="flex">
        <IconButton
          disabled={isBusy}
          onClick={() => setIsEditing(true)}
          aria-label={`Edit "${task.title}"`}
          className={revealOnHover}
        >
          <Pencil className="size-4" aria-hidden="true" />
        </IconButton>
        <IconButton
          tone="danger"
          disabled={isBusy}
          onClick={() => setIsConfirmingDelete(true)}
          aria-label={`Delete "${task.title}"`}
          className={revealOnHover}
        >
          <Trash2 className="size-4" aria-hidden="true" />
        </IconButton>
      </div>

      {updateTask.isError && (
        <p role="alert" className="col-span-full text-sm text-danger">
          {getErrorMessage(updateTask.error)}
        </p>
      )}

      {isEditing && (
        <TaskEditDialog task={task} onClose={() => setIsEditing(false)} />
      )}

      {isConfirmingDelete && (
        <ConfirmDialog
          title="Delete task?"
          confirmLabel="Delete"
          pendingLabel="Deleting…"
          isPending={deleteTask.isPending}
          error={deleteTask.isError ? getErrorMessage(deleteTask.error) : null}
          onConfirm={handleDelete}
          onCancel={closeDeleteDialog}
        >
          <p>
            <strong className="wrap-anywhere">“{task.title}”</strong> will be
            permanently deleted.
          </p>
        </ConfirmDialog>
      )}
    </li>
  );
};

export default TaskItem;
