import { DashboardSummary } from "@/components/dashboard/dashboard-summary";
import { LatestReadings } from "@/components/dashboard/latest-readings";
import { LinkButton } from "@/components/ui/button";
import { getDashboardStats } from "@/lib/services/dashboard";
import { getSettingValue } from "@/lib/services/settings";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const stats = await getDashboardStats();
  const currency = await getSettingValue("currency", "THB");

  return (
    <div className="grid gap-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-950">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">
            A simple overview of meters, latest readings, usage, and estimated
            cost.
          </p>
        </div>
        <LinkButton href="/meters/new">Create meter</LinkButton>
      </div>

      <DashboardSummary
        totalMeters={stats.totalMeters}
        latestUsage={stats.latestUsage}
        estimatedCost={stats.estimatedCost}
        currency={currency}
      />

      <section className="grid gap-3">
        <h2 className="text-lg font-semibold text-slate-950">
          Latest readings
        </h2>
        <LatestReadings items={stats.latestReadings} currency={currency} />
      </section>
    </div>
  );
}
