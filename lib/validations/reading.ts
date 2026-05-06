export type ReadingInput = {
  readingValue: number;
  readingDate: Date;
  note?: string;
};

export function validateReadingForm(formData: FormData): ReadingInput {
  const readingValue = Number(formData.get("readingValue"));
  const readingDateRaw = String(formData.get("readingDate") ?? "");
  const note = String(formData.get("note") ?? "").trim();
  const readingDate = new Date(`${readingDateRaw}T00:00:00`);

  if (!Number.isFinite(readingValue) || readingValue < 0) {
    throw new Error("Reading value must be zero or greater.");
  }
  if (!readingDateRaw || Number.isNaN(readingDate.getTime())) {
    throw new Error("Reading date is required.");
  }

  return { readingValue, readingDate, note: note || undefined };
}
