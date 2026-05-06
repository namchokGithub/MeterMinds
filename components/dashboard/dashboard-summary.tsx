import { StatCard } from "@/components/dashboard/stat-card";
import { formatMoney, formatNumber } from "@/lib/utils";

export function DashboardSummary({
  totalMeters,
  latestUsage,
  estimatedCost,
  currency,
}: {
  totalMeters: number;
  latestUsage: number;
  estimatedCost: number;
  currency: string;
}) {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      <StatCard label="Total meters" value={String(totalMeters)} />
      <StatCard label="Latest usage" value={formatNumber(latestUsage)} />
      <StatCard
        label="Estimated cost"
        value={formatMoney(estimatedCost, currency)}
      />
    </section>
  );
}
