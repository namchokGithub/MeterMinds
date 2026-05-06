import { notFound } from "next/navigation";
import { MeterForm } from "@/components/meter/meter-form";
import { updateMeterAction } from "@/lib/actions/meter-actions";
import { getMeter } from "@/lib/services/meters";

export default async function EditMeterPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meter = await getMeter(id);

  if (!meter) notFound();

  const action = updateMeterAction.bind(null, meter.id);

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-950">Edit meter</h1>
        <p className="mt-1 text-sm text-slate-500">Update meter details and rate.</p>
      </div>
      <MeterForm meter={meter} action={action} />
    </div>
  );
}
