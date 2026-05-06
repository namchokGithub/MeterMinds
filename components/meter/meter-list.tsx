import Link from "next/link";
import type { Meter, MeterReading } from "@prisma/client";
import { LinkButton } from "@/components/ui/button";
import { formatDate, formatNumber } from "@/lib/utils";

type MeterWithLatest = Meter & {
  readings: MeterReading[];
};

export function MeterList({ meters }: { meters: MeterWithLatest[] }) {
  if (meters.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <p className="text-sm text-slate-500">No meters yet.</p>
        <LinkButton href="/meters/new" className="mt-4">
          Create meter
        </LinkButton>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {meters.map((meter) => {
        const latest = meter.readings[0];
        return (
          <Link
            key={meter.id}
            href={`/meters/${meter.id}`}
            className="rounded-lg border border-slate-200 bg-white p-4 hover:border-slate-400"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold text-slate-950">{meter.name}</h2>
                <p className="text-sm text-slate-500">
                  {meter.type} · {meter.unit} · rate {formatNumber(meter.ratePerUnit)}
                </p>
              </div>
              <div className="text-right text-sm text-slate-600">
                {latest ? (
                  <>
                    <p>
                      {formatNumber(latest.readingValue)} {meter.unit}
                    </p>
                    <p className="text-slate-500">{formatDate(latest.readingDate)}</p>
                  </>
                ) : (
                  <p className="text-slate-500">No readings</p>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
