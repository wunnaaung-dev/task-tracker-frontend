import { useState, type SubmitEvent } from "react";
import { getErrorMessage } from "@/lib/api-client";
import { useCreateTask } from "../hooks/use-task-mutations";
import type { Priority } from "../types";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { PRIORITY_OPTIONS } from "../constants";

const MAX_TITLE = 100;

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const createTask = useCreateTask();

  const trimmed = title.trim();
  const canSubmit = trimmed.length > 0 && !createTask.isPending;

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;

    createTask.mutate(
      { title: trimmed, priority },
      {
        onSuccess: () => {
          setTitle("");
          setPriority("medium");
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="grid grid-cols-[1fr_auto] gap-2 sm:grid-cols-[1fr_auto_auto]">
        <label htmlFor="task-title" className="sr-only">
          Task title
        </label>
        <input
          id="task-title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (createTask.isError) createTask.reset();
          }}
          placeholder="Buy milk"
          maxLength={MAX_TITLE}
          autoComplete="off"
          className="col-span-2 min-h-11 border border-ink bg-paper px-4 placeholder:text-muted sm:col-span-1"
        />

        <label htmlFor="task-priority" className="sr-only">
          Priority
        </label>
        <Select
          label="Priority"
          hideLabel
          value={priority}
          options={PRIORITY_OPTIONS}
          onChange={setPriority}
          className="min-w-32"
        />

        <Button type="submit" disabled={!canSubmit} isLoading={createTask.isPending}>
          {createTask.isPending ? "Adding…" : "Add"}
        </Button>
      </div>

      {createTask.isError && (
        <p
          role="alert"
          className="mt-2 border-l-3 border-danger pl-2 text-sm text-danger"
        >
          {getErrorMessage(createTask.error)}
        </p>
      )}
    </form>
  );
};

export default TaskForm;
