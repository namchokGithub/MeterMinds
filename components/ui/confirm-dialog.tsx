"use client";

import { type ReactNode, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  children?: ReactNode;
};

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
  children,
}: ConfirmDialogProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!open) {
      setVisible(false);
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !loading) {
        onCancel();
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    const frame = window.requestAnimationFrame(() => setVisible(true));

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [loading, onCancel, open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center px-4 pb-4 pt-16 backdrop-blur-[2px] transition duration-200 sm:items-center sm:p-6 ${
        visible ? "bg-slate-950/30 opacity-100" : "bg-slate-950/0 opacity-0"
      }`}
      onClick={loading ? undefined : onCancel}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
        className={`w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-2xl transition duration-200 ease-out ${
          visible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-3 scale-[0.98] opacity-0"
        }`}
        onClick={(event) => event.stopPropagation()}>
        <div className="grid gap-5">
          <div className="grid gap-2">
            <h3
              id="confirm-dialog-title"
              className="text-lg font-semibold text-slate-950">
              {title}
            </h3>

            <p
              id="confirm-dialog-description"
              className="text-sm leading-6 text-slate-500">
              {description}
            </p>
          </div>

          {children ? <div>{children}</div> : null}

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="w-full sm:w-auto">
              {cancelLabel}
            </Button>

            <Button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className="w-full border-slate-900 bg-slate-900 text-white hover:bg-slate-800 sm:w-auto">
              {loading ? "Saving..." : confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
