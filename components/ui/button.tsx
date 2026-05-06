import Link from "next/link";
import type { ComponentProps } from "react";

const styles =
  "inline-flex h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-900 transition hover:bg-slate-100";

type ButtonProps = ComponentProps<"button"> & {
  variant?: "default" | "danger";
};

export function Button({ className = "", variant = "default", ...props }: ButtonProps) {
  const variantClass =
    variant === "danger"
      ? "border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
      : "";

  return <button className={`${styles} ${variantClass} ${className}`} {...props} />;
}

export function LinkButton({
  className = "",
  ...props
}: ComponentProps<typeof Link>) {
  return <Link className={`${styles} ${className}`} {...props} />;
}
