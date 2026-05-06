import Link from "next/link";
import type { Meter } from "@prisma/client";
import type { ReadingWithUsage } from "@/lib/services/readings";
import { formatDate, formatMoney, formatNumber } from "@/lib/utils";

type LatestReading = {
  meter: Meter;
  reading: ReadingWithUsage;
  usage: number;
  estimatedCost: number;
};

export function LatestReadings({
  items,
  currency,
}: {
  items: LatestReading[];
  currency: string;
}) {
  if (items.length === 0) {
    return (
      <p className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-500">
        No readings yet.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="px-4 py-3 font-medium">Meter</th>
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 font-medium">Reading</th>
            <th className="px-4 py-3 font-medium">Usage</th>
            <th className="px-4 py-3 font-medium">Cost</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.reading.id} className="border-t border-slate-100">
              <td className="px-4 py-3">
                <Link href={`/meters/${item.meter.id}`} className="font-medium">
                  {item.meter.name}
                </Link>
              </td>
              <td className="px-4 py-3">
                {formatDate(item.reading.readingDate)}
              </td>
              <td className="px-4 py-3">
                {formatNumber(item.reading.readingValue)} {item.meter.unit}
              </td>
              <td className="px-4 py-3">{formatNumber(item.usage)}</td>
              <td className="px-4 py-3">
                {formatMoney(item.estimatedCost, currency)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
