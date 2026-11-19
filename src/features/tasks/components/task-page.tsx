import { useState } from "react";
import { getErrorMessage } from "@/lib/api-client";
import type { TaskStatus } from "../types";
import { useTasks } from "../hooks/use-tasks";

const TaskPage = () => {
  const [status] = useState<TaskStatus>("all");
  const { data: tasks = [], isPending, error } = useTasks(status);

  return (
    <main className="mx-auto max-w-xl px-4 py-12">
      <h1 className="border-b-4 border-ink pb-2 text-5xl font-bold tracking-tighter">Tasks</h1>
      {isPending && <p className="py-8 text-center text-muted">Loading tasks…</p>}
      {error && <p className="text-accent">{getErrorMessage(error)}</p>}
      <ul>{tasks.map((t) => <li key={t.id}>{t.title}</li>)}</ul>
    </main>
  );
};

export default TaskPage;
