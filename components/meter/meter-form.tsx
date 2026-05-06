import type { Meter } from "@prisma/client";
import { Button, LinkButton } from "@/components/ui/button";
import { Field } from "@/components/ui/field";

export function MeterForm({
  meter,
  action
}: {
  meter?: Meter;
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <form action={action} className="grid max-w-xl gap-4">
      <Field label="Name" name="name" defaultValue={meter?.name} required />
      <Field label="Type" name="type" defaultValue={meter?.type} placeholder="Electricity" required />
      <Field label="Unit" name="unit" defaultValue={meter?.unit} placeholder="kWh" required />
      <Field
        label="Rate per unit"
        name="ratePerUnit"
        type="number"
        step="0.01"
        min="0"
        defaultValue={meter?.ratePerUnit}
        required
      />
      <div className="flex gap-3">
        <Button type="submit">{meter ? "Save meter" : "Create meter"}</Button>
        <LinkButton href="/meters">Cancel</LinkButton>
      </div>
    </form>
  );
}
