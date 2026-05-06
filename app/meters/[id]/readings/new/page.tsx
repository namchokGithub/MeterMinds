import { notFound } from "next/navigation";
import { ReadingForm } from "@/components/meter/reading-form";
import { createReadingAction } from "@/lib/actions/reading-actions";
import { getMeter } from "@/lib/services/meters";

export default async function NewReadingPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meter = await getMeter(id);

  if (!meter) notFound();

  const action = createReadingAction.bind(null, meter.id);

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-950">Add reading</h1>
        <p className="mt-1 text-sm text-slate-500">
          Add a new reading for {meter.name}.
        </p>
      </div>
      <ReadingForm meterId={meter.id} action={action} />
    </div>
  );
}
