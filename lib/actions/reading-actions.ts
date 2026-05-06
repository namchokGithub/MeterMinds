"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createReading } from "@/lib/services/meters";
import { validateReadingForm } from "@/lib/validations/reading";

export async function createReadingAction(meterId: string, formData: FormData) {
  const input = validateReadingForm(formData);
  await createReading(meterId, input);
  revalidatePath("/");
  revalidatePath("/meters");
  revalidatePath(`/meters/${meterId}`);
  redirect(`/meters/${meterId}`);
}
