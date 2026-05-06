export type MeterInput = {
  name: string;
  type: string;
  unit: string;
  ratePerUnit: number;
};

export function validateMeterForm(formData: FormData): MeterInput {
  const name = String(formData.get("name") ?? "").trim();
  const type = String(formData.get("type") ?? "").trim();
  const unit = String(formData.get("unit") ?? "").trim();
  const ratePerUnit = Number(formData.get("ratePerUnit"));

  if (!name) throw new Error("Meter name is required.");
  if (!type) throw new Error("Meter type is required.");
  if (!unit) throw new Error("Unit is required.");
  if (!Number.isFinite(ratePerUnit) || ratePerUnit < 0) {
    throw new Error("Rate per unit must be zero or greater.");
  }

  return { name, type, unit, ratePerUnit };
}
