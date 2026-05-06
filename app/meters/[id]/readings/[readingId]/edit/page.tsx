import { notFound } from "next/navigation";
import { updateReadingAction } from "@/lib/actions/reading-actions";
import { getMeter } from "@/lib/services/meters";
import { getReadingById } from "@/lib/services/readings";
import { Button } from "@/components/ui/button";
import { ReadingEditForm } from "@/components/meter/reading-edit-form";

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

      <ReadingEditForm
        meterId={meter.id}
        meterName={meter.name}
        reading={{
          id: reading.id,
          readingValue: reading.readingValue,
          readingDate: formatDateTimeLocal(reading.readingDate),
          note: reading.note ?? "",
        }}
      />
    </div>
  );
}

function formatDateTimeLocal(date: Date) {
  const offset = date.getTimezoneOffset();

  const localDate = new Date(date.getTime() - offset * 60 * 1000);

  return localDate.toISOString().slice(0, 16);
}
