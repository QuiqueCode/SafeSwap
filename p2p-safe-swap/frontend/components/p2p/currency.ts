const CURRENCY_SYMBOLS: Record<string, string> = {
  EUR: "€",
  USD: "$",
  GBP: "£",
  JPY: "¥",
  CHF: "CHF",
  ARS: "$",
  MXN: "$",
  BRL: "R$",
};

export function getCurrencySymbol(code: string) {
  return CURRENCY_SYMBOLS[code.toUpperCase()] ?? code;
}
