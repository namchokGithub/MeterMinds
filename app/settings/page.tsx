import { getSettingValue } from "@/lib/services/settings";
import { SettingsCurrencyForm } from "@/components/settings/settings-currency-form";

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

export default async function SettingsPage() {
  const currency = await getSettingValue("currency", "THB");

  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-950">Settings</h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage display preferences and application defaults.
        </p>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">Currency</h2>

            <p className="mt-1 text-sm text-slate-500">
              Select the default currency used across the dashboard, readings,
              and estimated cost calculations.
            </p>
          </div>

          <SettingsCurrencyForm defaultCurrency={currency} />
        </div>
      </section>
    </div>
  );
}
