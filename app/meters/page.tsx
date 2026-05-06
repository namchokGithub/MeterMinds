import { MeterList } from "@/components/meter/meter-list";
import { LinkButton } from "@/components/ui/button";
import { getMeters } from "@/lib/services/meters";

export const dynamic = "force-dynamic";

export default async function MetersPage() {
  const meters = await getMeters();

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-950">Meters</h1>
          <p className="mt-1 text-sm text-slate-500">
            Track electricity, water, gas, and custom meters.
          </p>
        </div>
        <LinkButton href="/meters/new">Create meter</LinkButton>
      </div>
      <MeterList meters={meters} />
    </div>
  );
}
