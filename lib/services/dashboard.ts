import { prisma } from "@/lib/prisma";
import { attachUsage } from "@/lib/services/readings";

export async function getDashboardStats() {
  const meters = await prisma.meter.findMany({
    include: {
      readings: {
        orderBy: { readingDate: "desc" },
        take: 2
      }
    },
    orderBy: { createdAt: "desc" }
  });

  const latest = meters.flatMap((meter) => {
    const readings = attachUsage(meter, meter.readings);
    const latestReading = readings[0];
    return latestReading
      ? [
          {
            meter,
            reading: latestReading,
            usage: latestReading.usage,
            estimatedCost: latestReading.estimatedCost
          }
        ]
      : [];
  });

  return {
    totalMeters: meters.length,
    latestReadings: latest,
    latestUsage: latest.reduce((sum, item) => sum + item.usage, 0),
    estimatedCost: latest.reduce((sum, item) => sum + item.estimatedCost, 0)
  };
}
