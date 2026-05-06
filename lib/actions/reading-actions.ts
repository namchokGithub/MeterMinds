"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createReading } from "@/lib/services/meters";
import { validateReadingForm } from "@/lib/validations/reading";

import { prisma } from "@/lib/prisma";

export async function deleteReadingAction(meterId: string, readingId: string) {
  await prisma.meterReading.delete({
    where: {
      id: readingId,
    },
  });

  revalidatePath(`/meters/${meterId}`);
  redirect(`/meters/${meterId}`);
}

export async function createReadingAction(meterId: string, formData: FormData) {
  const input = validateReadingForm(formData);
  await createReading(meterId, input);
  revalidatePath("/");
  revalidatePath("/meters");
  revalidatePath(`/meters/${meterId}`);
  redirect(`/meters/${meterId}`);
}

export async function updateReadingAction(formData: FormData) {
  const meterId = String(formData.get("meterId"));
  const readingId = String(formData.get("readingId"));

  const readingValue = Number(formData.get("readingValue"));

  const readingDate = String(formData.get("readingDate"));

  const note = String(formData.get("note") || "");

  await prisma.meterReading.update({
    where: {
      id: readingId,
    },
    data: {
      readingValue,
      readingDate: new Date(readingDate),
      note: note || null,
    },
  });

  revalidatePath(`/meters/${meterId}`);

  redirect(`/meters/${meterId}`);
}
