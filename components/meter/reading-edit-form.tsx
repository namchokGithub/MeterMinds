"use client";

import { useRef, useState } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { updateReadingAction } from "@/lib/actions/reading-actions";
import { Button } from "@/components/ui/button";

export function ReadingEditForm({
  meterId,
  meterName,
  reading,
}: {
  meterId: string;
  meterName: string;
  reading: {
    id: string;
    readingValue: number;
    readingDate: string;
    note: string | null;
  };
}) {
  const today = new Date().toISOString().slice(0, 10);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-950">Edit reading</h1>

        <p className="mt-1 text-sm text-slate-500">
          Update reading value, date, or note for {meterName}.
        </p>
      </div>

      <form
        ref={formRef}
        action={updateReadingAction}
        className="grid gap-6 rounded-lg border border-slate-200 bg-white p-6">
        <input type="hidden" name="meterId" value={meterId} />
        <input type="hidden" name="readingId" value={reading.id} />

        <div className="grid gap-2">
          <label
            htmlFor="readingValue"
            className="text-sm font-medium text-slate-700">
            Reading value
          </label>

          <input
            id="readingValue"
            name="readingValue"
            type="number"
            step="0.01"
            defaultValue={reading.readingValue}
            required
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="grid gap-2">
          <label
            htmlFor="readingDate"
            className="text-sm font-medium text-slate-700">
            Reading date and time
          </label>

          <input
            id="readingDate"
            name="readingDate"
            type="datetime-local"
            defaultValue={reading.readingDate}
            required
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="note" className="text-sm font-medium text-slate-700">
            Note
          </label>

          <textarea
            id="note"
            name="note"
            rows={4}
            defaultValue={reading.note ?? ""}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="flex justify-end">
          <Button type="button" onClick={() => setConfirmOpen(true)}>
            Save changes
          </Button>
        </div>

        <ConfirmDialog
          open={confirmOpen}
          title="Save currency changes?"
          description="This will update the default currency used across the dashboard and estimated cost calculations."
          confirmLabel="Save"
          cancelLabel="Cancel"
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() => {
            setConfirmOpen(false);
            formRef.current?.requestSubmit();
          }}
        />
      </form>
    </div>
  );
}
