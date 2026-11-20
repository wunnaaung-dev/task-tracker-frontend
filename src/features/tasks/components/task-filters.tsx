import { ToggleButton } from "@/components/ui/toggle-button";
import type { TaskStatus } from "../types";

const FILTERS: { value: TaskStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

interface TaskFiltersProps {
  value: TaskStatus;
  onChange: (status: TaskStatus) => void;
}

const TaskFilters = ({ value, onChange }: TaskFiltersProps) => {
  return (
    <div
      role="group"
      aria-label="Filter tasks"
      className="mb-4 grid grid-cols-3 border-b border-line sm:flex sm:gap-6"
    >
      {FILTERS.map((filter) => (
        <ToggleButton
          key={filter.value}
          pressed={value === filter.value}
          onClick={() => onChange(filter.value)}
        >
          {filter.label}
        </ToggleButton>
      ))}
    </div>
  );
};

export default TaskFilters;
