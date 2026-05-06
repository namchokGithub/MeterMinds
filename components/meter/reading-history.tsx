import type { Meter } from "@prisma/client";
import type { ReadingWithUsage } from "@/lib/services/readings";
import { formatDate, formatMoney, formatNumber } from "@/lib/utils";
import { Button, LinkButton } from "@/components/ui/button";
import { deleteReadingAction } from "@/lib/actions/reading-actions";

export function ReadingHistory({
  meter,
  readings,
}: {
  meter: Meter;
  readings: ReadingWithUsage[];
}) {
  if (readings.length === 0) {
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
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 font-medium">Reading</th>
            <th className="px-4 py-3 font-medium">Usage</th>
            <th className="px-4 py-3 font-medium">Estimated cost</th>
            <th className="px-4 py-3 font-medium">Note</th>
            <th className="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>

        <tbody>
          {readings.map((reading) => {
            const deleteAction = deleteReadingAction.bind(
              null,
              meter.id,
              reading.id,
            );

            return (
              <tr key={reading.id} className="border-t border-slate-100">
                <td className="px-4 py-3">{formatDate(reading.readingDate)}</td>

                <td className="px-4 py-3">
                  {formatNumber(reading.readingValue)} {meter.unit}
                </td>

                <td className="px-4 py-3">{formatNumber(reading.usage)}</td>

                <td className="px-4 py-3">
                  {formatMoney(reading.estimatedCost)}
                </td>

                <td className="px-4 py-3 text-slate-500">
                  {reading.note ?? "-"}
                </td>

                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <LinkButton
                      href={`/meters/${meter.id}/readings/${reading.id}/edit`}>
                      Edit
                    </LinkButton>

                    <form action={deleteAction}>
                      <Button type="submit" variant="danger">
                        Delete
                      </Button>
                    </form>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
