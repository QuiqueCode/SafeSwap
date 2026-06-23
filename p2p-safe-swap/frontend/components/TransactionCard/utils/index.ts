import { TransactionCardLang } from "../types";

export const translations = {
  es: {
    available: "Disponible",
    window:    "Ventana",
    limits:    "Límites",
    buy:       "Comprar",
    sell:      "Vender",
  },
  en: {
    available: "Available",
    window:    "Time window",
    limits:    "Limits",
    buy:       "Buy",
    sell:      "Sell",
  },
} satisfies Record<TransactionCardLang, object>;

export function formatNumber(n: number) {
  return Math.floor(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function truncateAddress(address: string) {
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function getInitials(address: string) {
  const clean = address.replace(/^0x/i, "");
  return clean.slice(0, 2).toUpperCase();
}