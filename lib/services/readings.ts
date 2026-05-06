import type { Meter, MeterReading } from "@prisma/client";
import { prisma } from "../prisma";

export type ReadingWithUsage = MeterReading & {
  usage: number;
  estimatedCost: number;
};

export async function getReadingById(readingId: string) {
  return prisma.meterReading.findUnique({
    where: {
      id: readingId,
    },
  });
}

export function attachUsage(
  meter: Meter,
  readings: MeterReading[],
): ReadingWithUsage[] {
  const chronological = [...readings].sort(
    (a, b) => a.readingDate.getTime() - b.readingDate.getTime(),
  );

  const usageById = new Map<
    string,
    Pick<ReadingWithUsage, "usage" | "estimatedCost">
  >();

  chronological.forEach((reading, index) => {
    const previous = chronological[index - 1];
    const usage = previous ? reading.readingValue - previous.readingValue : 0;
    usageById.set(reading.id, {
      usage,
      estimatedCost: usage * meter.ratePerUnit,
    });
  });

  return readings.map((reading) => ({
    ...reading,
    usage: usageById.get(reading.id)?.usage ?? 0,
    estimatedCost: usageById.get(reading.id)?.estimatedCost ?? 0,
  }));
}
