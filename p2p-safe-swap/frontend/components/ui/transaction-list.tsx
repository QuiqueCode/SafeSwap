"use client";

import * as React from "react";
import { Check, Clock, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { TabBar } from "@/frontend/components/ui/tab-bar";

export interface Transaction {
  id: string;
  name: string;
  note?: string;
  amount: number;
  currency?: string;
  date: string;
  type: "in" | "out" | "request";
}

export type TransactionTab = "all" | "in" | "out" | "requests";

export interface TransactionListProps
  extends Omit<React.ComponentProps<"div">, "onChange"> {
  transactions: Transaction[];
  searchQuery: string;
  activeTab: TransactionTab;
  onSearch: (query: string) => void;
  onTabChange: (tab: string) => void;
}

const TABS: { value: TransactionTab; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "in", label: "Entradas" },
  { value: "out", label: "Salidas" },
  { value: "requests", label: "Solicitudes" },
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function startOfDay(date: Date): Date {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function getSectionLabel(date: Date, today: Date): string {
  const target = startOfDay(date);
  const todayStart = startOfDay(today);
  const yesterdayStart = new Date(todayStart);
  yesterdayStart.setDate(yesterdayStart.getDate() - 1);

  if (target.getTime() === todayStart.getTime()) return "HOY";
  if (target.getTime() === yesterdayStart.getTime()) return "AYER";

  return date
    .toLocaleDateString("es-ES", { month: "long" })
    .toUpperCase();
}

function formatAmount(amount: number, currency = "€"): string {
  const absolute = Math.abs(amount).toFixed(2);
  const sign = amount >= 0 ? "+" : "-";
  return `${sign}${absolute} ${currency}`;
}

function formatTimestamp(date: Date, today: Date): string {
  const target = startOfDay(date);
  const todayStart = startOfDay(today);
  const yesterdayStart = new Date(todayStart);
  yesterdayStart.setDate(yesterdayStart.getDate() - 1);

  if (target.getTime() === todayStart.getTime()) {
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  if (target.getTime() === yesterdayStart.getTime()) {
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
  });
}

function matchesSearch(transaction: Transaction, query: string): boolean {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;

  const nameMatch = transaction.name.toLowerCase().includes(normalized);
  const amountMatch = Math.abs(transaction.amount)
    .toFixed(2)
    .includes(normalized.replace(",", "."));

  return nameMatch || amountMatch;
}

function matchesTab(transaction: Transaction, tab: TransactionTab): boolean {
  if (tab === "all") return true;
  if (tab === "requests") return transaction.type === "request";
  return transaction.type === tab;
}

export function TransactionList({
  transactions,
  searchQuery,
  activeTab,
  onSearch,
  onTabChange,
  className,
  ...props
}: TransactionListProps) {
  const today = React.useMemo(() => new Date(), []);
  const tabLabels = TABS.map((tab) => tab.label);
  const activeIndex = Math.max(
    0,
    TABS.findIndex((tab) => tab.value === activeTab)
  );

  const filteredTransactions = React.useMemo(() => {
    return transactions
      .filter((transaction) => matchesTab(transaction, activeTab))
      .filter((transaction) => matchesSearch(transaction, searchQuery))
      .sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
  }, [transactions, activeTab, searchQuery]);

  const groupedTransactions = React.useMemo(() => {
    const groups = new Map<string, Transaction[]>();

    for (const transaction of filteredTransactions) {
      const date = new Date(transaction.date);
      const label = getSectionLabel(date, today);
      const existing = groups.get(label) ?? [];
      existing.push(transaction);
      groups.set(label, existing);
    }

    return Array.from(groups.entries());
  }, [filteredTransactions, today]);

  return (
    <div
      data-slot="transaction-list"
      className={cn("flex w-full flex-col gap-4", className)}
      {...props}
    >
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Buscar transacciones..."
          aria-label="Buscar transacciones"
          className={cn(
            "h-12 w-full rounded-2xl border border-transparent bg-primary/5 pl-11 pr-4 text-sm",
            "text-foreground placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
          )}
        />
      </div>

      <TabBar
        tabs={tabLabels}
        activeIndex={activeIndex}
        onChange={(index) => onTabChange(TABS[index].value)}
        className="w-full overflow-x-auto"
      />

      {groupedTransactions.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">
          No hay transacciones
        </p>
      ) : (
        <div className="flex flex-col gap-5">
          {groupedTransactions.map(([sectionLabel, sectionTransactions]) => (
            <section key={sectionLabel} className="flex flex-col gap-2">
              <h2 className="px-1 text-xs font-semibold tracking-wide text-muted-foreground">
                {sectionLabel}
              </h2>

              <div className="overflow-hidden rounded-2xl border border-border bg-card">
                {sectionTransactions.map((transaction, index) => {
                  const date = new Date(transaction.date);
                  const isIncoming = transaction.amount >= 0;
                  const currency = transaction.currency ?? "€";

                  return (
                    <div
                      key={transaction.id}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3",
                        index > 0 && "border-t border-border"
                      )}
                    >
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                        {getInitials(transaction.name)}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {transaction.name}
                        </p>
                        {transaction.note ? (
                          <p className="truncate text-xs text-muted-foreground">
                            {transaction.note}
                          </p>
                        ) : null}
                      </div>

                      <div className="flex shrink-0 flex-col items-end gap-1">
                        <p
                          className={cn(
                            "text-sm font-semibold",
                            isIncoming ? "text-primary" : "text-foreground"
                          )}
                        >
                          {formatAmount(transaction.amount, currency)}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Check className="size-3 text-primary" />
                          <Clock className="size-3" />
                          <span>{formatTimestamp(date, today)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
