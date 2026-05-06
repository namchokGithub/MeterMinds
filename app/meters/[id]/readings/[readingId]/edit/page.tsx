import { notFound } from "next/navigation";

import { updateReadingAction } from "@/lib/actions/reading-actions";
import { getMeter } from "@/lib/services/meters";
import { getReadingById } from "@/lib/services/readings";

import { Button } from "@/components/ui/button";

export default async function EditReadingPage({
  params,
}: {
  params: Promise<{
    id: string;
    readingId: string;
  }>;
}) {
  const { id, readingId } = await params;

  const meter = await getMeter(id);

  if (!meter) {
    notFound();
  }

  const reading = await getReadingById(readingId);

  if (!reading || reading.meterId !== meter.id) {
    notFound();
  }

  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-950">Edit reading</h1>

        <p className="mt-1 text-sm text-slate-500">
          Update reading value, date, or note for {meter.name}.
        </p>
      </div>

      <form
        action={updateReadingAction}
        className="grid gap-6 rounded-lg border border-slate-200 bg-white p-6">
        <input type="hidden" name="meterId" value={meter.id} />
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
            defaultValue={formatDateTimeLocal(reading.readingDate)}
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
          <Button type="submit">Save changes</Button>
        </div>
      </form>
    </div>
  );
}

function formatDateTimeLocal(date: Date) {
  const offset = date.getTimezoneOffset();

  const localDate = new Date(date.getTime() - offset * 60 * 1000);

  return localDate.toISOString().slice(0, 16);
}
