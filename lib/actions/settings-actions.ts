"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

export async function updateCurrencyAction(formData: FormData) {
  const currency = String(formData.get("currency") || "THB");

  await prisma.appSetting.upsert({
    where: {
      key: "currency",
    },
    update: {
      value: currency,
    },
    create: {
      key: "currency",
      value: currency,
    },
  });

  revalidatePath("/settings");
  revalidatePath("/");
  revalidatePath("/meters");
}
