import type { ReactNode } from "react";
import { Button } from "./button";
import { Dialog } from "./dialog";

interface ConfirmDialogProps {
  title: string;
  children: ReactNode;
  confirmLabel?: string;
  pendingLabel?: string;
  isPending?: boolean;
  error?: string | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  title,
  children,
  confirmLabel = "Confirm",
  pendingLabel = "Working…",
  isPending = false,
  error,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Dialog title={title} onClose={onCancel}>
      <div className="mb-6 text-ink">{children}</div>

      {error && (
        <p
          role="alert"
          className="mb-4 border-l-3 border-danger pl-2 text-sm text-danger"
        >
          {error}
        </p>
      )}

      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onCancel} autoFocus>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} isLoading={isPending}>
          {isPending ? pendingLabel : confirmLabel}
        </Button>
      </div>
    </Dialog>
  );
}
