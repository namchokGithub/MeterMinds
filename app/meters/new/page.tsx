import { MeterForm } from "@/components/meter/meter-form";
import { createMeterAction } from "@/lib/actions/meter-actions";

export default function NewMeterPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-950">Create meter</h1>
        <p className="mt-1 text-sm text-slate-500">Add a utility meter to track readings.</p>
      </div>
      <MeterForm action={createMeterAction} />
    </div>
  );
}
