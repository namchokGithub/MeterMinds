"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createMeter,
  deleteMeter,
  updateMeter
} from "@/lib/services/meters";
import { validateMeterForm } from "@/lib/validations/meter";

export async function createMeterAction(formData: FormData) {
  const input = validateMeterForm(formData);
  await createMeter(input);
  revalidatePath("/");
  revalidatePath("/meters");
  redirect("/meters");
}

export async function updateMeterAction(id: string, formData: FormData) {
  const input = validateMeterForm(formData);
  await updateMeter(id, input);
  revalidatePath("/");
  revalidatePath("/meters");
  revalidatePath(`/meters/${id}`);
  redirect(`/meters/${id}`);
}

export async function deleteMeterAction(id: string) {
  await deleteMeter(id);
  revalidatePath("/");
  revalidatePath("/meters");
  redirect("/meters");
}
