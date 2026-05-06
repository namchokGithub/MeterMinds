"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

import { updateCurrencyAction } from "@/lib/actions/settings-actions";

import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

const currencies = [
  {
    code: "THB",
    label: "Thai Baht",
    symbol: "฿",
  },
  {
    code: "USD",
    label: "US Dollar",
    symbol: "$",
  },
  {
    code: "EUR",
    label: "Euro",
    symbol: "€",
  },
  {
    code: "JPY",
    label: "Japanese Yen",
    symbol: "¥",
  },
];

export function SettingsCurrencyForm({
  defaultCurrency,
}: {
  defaultCurrency: string;
}) {
  const [currency, setCurrency] = useState(defaultCurrency);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const selectedCurrency =
    currencies.find((item) => item.code === currency) ?? currencies[0];

  const preview = useMemo(() => {
    switch (currency) {
      case "USD":
        return {
          estimated: "$1,250.50",
          monthly: "$5,420.00",
        };

      case "EUR":
        return {
          estimated: "€1,250.50",
          monthly: "€5,420.00",
        };

      case "JPY":
        return {
          estimated: "¥1,251",
          monthly: "¥5,420",
        };

      case "THB":
      default:
        return {
          estimated: "฿1,250.50",
          monthly: "฿5,420.00",
        };
    }
  }, [currency]);

  return (
    <form ref={formRef} action={updateCurrencyAction} className="grid gap-6">
      <div className="grid gap-2">
        <label
          htmlFor="currency"
          className="text-sm font-medium text-slate-700">
          Default currency
        </label>

        <select
          id="currency"
          name="currency"
          value={currency}
          onChange={(event) => setCurrency(event.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400">
          {currencies.map((item) => (
            <option key={item.code} value={item.code}>
              {item.symbol} {item.code} · {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-medium text-slate-700">Preview</p>

        <div className="mt-3 grid gap-2 text-sm text-slate-600">
          <div className="flex items-center justify-between">
            <span>Estimated cost</span>

            <span className="font-medium text-slate-950">
              {preview.estimated}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span>Monthly summary</span>

            <span className="font-medium text-slate-950">
              {preview.monthly}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <SubmitTrigger
          disabled={currency === defaultCurrency}
          onOpenConfirm={() => setConfirmOpen(true)}
        />
      </div>

      <ConfirmSubmitDialog
        open={confirmOpen}
        currencyLabel={`${selectedCurrency.symbol} ${selectedCurrency.code} · ${selectedCurrency.label}`}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => formRef.current?.requestSubmit()}
      />
    </form>
  );
}

function SubmitTrigger({
  disabled,
  onOpenConfirm,
}: {
  disabled: boolean;
  onOpenConfirm: () => void;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onOpenConfirm();
      }}
      disabled={disabled || pending}
      className="border-slate-900 bg-slate-900 text-white hover:bg-slate-800">
      {pending ? "Saving..." : "Save changes"}
    </Button>
  );
}

function ConfirmSubmitDialog({
  open,
  currencyLabel,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  currencyLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const { pending } = useFormStatus();
  const wasPendingRef = useRef(false);

  useEffect(() => {
    if (pending) {
      wasPendingRef.current = true;
      return;
    }

    if (wasPendingRef.current) {
      wasPendingRef.current = false;
      onCancel();
    }
  }, [onCancel, pending]);

  return (
    <ConfirmDialog
      open={open}
      title="Confirm currency update"
      description="This changes how values are displayed across the dashboard, readings, and cost summaries."
      confirmLabel="Apply currency"
      cancelLabel="Keep current"
      loading={pending}
      onCancel={onCancel}
      onConfirm={onConfirm}>
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="text-slate-500">New default currency</span>

          <span className="font-medium text-slate-950">{currencyLabel}</span>
        </div>
      </div>
    </ConfirmDialog>
  );
}
