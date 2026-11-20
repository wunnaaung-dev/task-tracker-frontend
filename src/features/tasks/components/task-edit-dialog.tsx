import { useEffect, useRef, useState, type SubmitEvent } from "react";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Select } from "@/components/ui/select";
import { getErrorMessage } from "@/lib/api-client";

import { PRIORITY_OPTIONS } from "../constants";
import { useUpdateTask } from "../hooks/use-task-mutations";
import type { Priority, Task } from "../types";

const MAX_TITLE = 100;

interface TaskEditDialogProps {
  task: Task;
  onClose: () => void;
}

const TaskEditDialog = ({ task, onClose }: TaskEditDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [title, setTitle] = useState(task.title);
  const [priority, setPriority] = useState<Priority>(task.priority);
  const updateTask = useUpdateTask();

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const trimmed = title.trim();
  const hasChanges = trimmed !== task.title || priority !== task.priority;
  const canSave = trimmed.length > 0 && hasChanges && !updateTask.isPending;

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSave) return;

    updateTask.mutate(
      { id: task.id, input: { title: trimmed, priority } },
      { onSuccess: onClose },
    );
  };

  return (
    <Dialog title="Edit task" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <label
          htmlFor={`edit-input-${task.id}`}
          className="mb-1 block text-xs font-bold tracking-widest text-muted uppercase"
        >
          Title
        </label>
        <input
          id={`edit-input-${task.id}`}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (updateTask.isError) updateTask.reset();
          }}
          maxLength={MAX_TITLE}
          autoFocus
          autoComplete="off"
          className="mb-1 min-h-11 w-full border border-ink bg-paper px-4"
        />
        <p className="mb-4 text-right text-xs text-muted">
          {title.length}/{MAX_TITLE}
        </p>

        <Select
          label="Priority"
          value={priority}
          options={PRIORITY_OPTIONS}
          onChange={setPriority}
          className="mb-6"
        />

        {updateTask.isError && (
          <p
            role="alert"
            className="mb-4 border-l-3 border-danger pl-2 text-sm text-danger"
          >
            {getErrorMessage(updateTask.error)}
          </p>
        )}

        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!canSave}
            isLoading={updateTask.isPending}
          >
            {updateTask.isPending ? "Saving…" : "Save"}
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default TaskEditDialog;
