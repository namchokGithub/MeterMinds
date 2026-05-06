export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en", {
    maximumFractionDigits: 2,
  }).format(value);
}

const currencySymbols: Record<string, string> = {
  THB: "฿",
  USD: "$",
  EUR: "€",
  JPY: "¥",
};

const currencyLocales: Record<string, string> = {
  THB: "th-TH",
  USD: "en-US",
  EUR: "de-DE",
  JPY: "ja-JP",
};

export function formatMoney(value: number, currency = "THB") {
  const locale = currencyLocales[currency] ?? "en-US";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}
