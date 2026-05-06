import type { ComponentProps } from "react";

type FieldProps = ComponentProps<"input"> & {
  label: string;
};

export function Field({ label, className = "", ...props }: FieldProps) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-700">
      {label}
      <input
        className={`h-10 rounded-md border border-slate-300 bg-white px-3 text-slate-900 outline-none focus:border-slate-600 ${className}`}
        {...props}
      />
    </label>
  );
}

type TextareaFieldProps = ComponentProps<"textarea"> & {
  label: string;
};

export function TextareaField({ label, className = "", ...props }: TextareaFieldProps) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-700">
      {label}
      <textarea
        className={`min-h-24 rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-slate-600 ${className}`}
        {...props}
      />
    </label>
  );
}
