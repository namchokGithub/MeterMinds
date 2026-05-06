import { Button, LinkButton } from "@/components/ui/button";
import { Field, TextareaField } from "@/components/ui/field";

export function ReadingForm({
  meterId,
  action
}: {
  meterId: string;
  action: (formData: FormData) => Promise<void>;
}) {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <form action={action} className="grid max-w-xl gap-4">
      <Field label="Reading value" name="readingValue" type="number" step="0.01" min="0" required />
      <Field label="Reading date" name="readingDate" type="date" defaultValue={today} required />
      <TextareaField label="Note" name="note" />
      <div className="flex gap-3">
        <Button type="submit">Add reading</Button>
        <LinkButton href={`/meters/${meterId}`}>Cancel</LinkButton>
      </div>
    </form>
  );
}
