import { notFound } from "next/navigation";
import { deleteMeterAction } from "@/lib/actions/meter-actions";
import { getMeter } from "@/lib/services/meters";
import { formatMoney, formatNumber } from "@/lib/utils";
import { Button, LinkButton } from "@/components/ui/button";
import { ReadingHistory } from "@/components/meter/reading-history";
import { getSettingValue } from "@/lib/services/settings";

export default async function MeterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meter = await getMeter(id);

  if (!meter) notFound();

  const latest = meter.readings[0];
  const deleteAction = deleteMeterAction.bind(null, meter.id);
  const currency = await getSettingValue("currency", "THB");

  return (
    <div className="grid gap-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-950">
            {meter.name}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {meter.type} · {meter.unit} ·{" "}
            {formatMoney(meter.ratePerUnit, currency)} per unit
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <LinkButton href={`/meters/${meter.id}/readings/new`}>
            Add reading
          </LinkButton>
          <LinkButton href={`/meters/${meter.id}/edit`}>Edit</LinkButton>
          <form action={deleteAction}>
            <Button type="submit" variant="danger">
              Delete
            </Button>
          </form>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">Latest reading</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">
            {latest
              ? `${formatNumber(latest.readingValue)} ${meter.unit}`
              : "-"}
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">Latest usage</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">
            {latest ? formatNumber(latest.usage) : "-"}
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">Estimated cost</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">
            {latest ? formatMoney(latest.estimatedCost, currency) : "-"}
          </p>
        </div>
      </section>

      <section className="grid gap-3">
        <h2 className="text-lg font-semibold text-slate-950">
          Reading history
        </h2>
        <ReadingHistory
          meter={meter}
          readings={meter.readings}
          currency={currency}
        />
      </section>
    </div>
  );
}
