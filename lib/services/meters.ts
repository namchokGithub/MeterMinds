import { prisma } from "@/lib/prisma";
import type { MeterInput } from "@/lib/validations/meter";
import type { ReadingInput } from "@/lib/validations/reading";
import { attachUsage } from "@/lib/services/readings";

export async function getMeters() {
  return prisma.meter.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      readings: {
        orderBy: { readingDate: "desc" },
        take: 1
      }
    }
  });
}

export async function getMeter(id: string) {
  const meter = await prisma.meter.findUnique({
    where: { id },
    include: {
      readings: {
        orderBy: { readingDate: "desc" }
      }
    }
  });

  if (!meter) return null;

  return {
    ...meter,
    readings: attachUsage(meter, meter.readings)
  };
}

export async function createMeter(input: MeterInput) {
  return prisma.meter.create({ data: input });
}

export async function updateMeter(id: string, input: MeterInput) {
  return prisma.meter.update({ where: { id }, data: input });
}

export async function deleteMeter(id: string) {
  return prisma.meter.delete({ where: { id } });
}

export async function createReading(meterId: string, input: ReadingInput) {
  return prisma.meterReading.create({
    data: {
      meterId,
      ...input
    }
  });
}
