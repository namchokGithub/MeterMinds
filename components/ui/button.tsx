import Link from "next/link";
import type { ComponentProps } from "react";

const styles =
  "inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60";

type ButtonProps = ComponentProps<"button"> & {
  variant?: "default" | "danger";
};

export function Button({ className = "", variant = "default", ...props }: ButtonProps) {
  const variantClass =
    variant === "danger"
      ? "border-red-700 bg-red-700 text-white hover:bg-red-800"
      : "border-slate-300 bg-slate-100 text-slate-950 hover:bg-slate-200";

  return <button className={`${styles} ${variantClass} ${className}`} {...props} />;
}

export function LinkButton({
  className = "",
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      className={`${styles} border-slate-300 bg-slate-100 text-slate-950 hover:bg-slate-200 ${className}`}
      {...props}
    />
  );
}
