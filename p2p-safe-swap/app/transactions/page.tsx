"use client";

import * as React from "react";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import {
  TransactionList,
  type Transaction,
  type TransactionTab,
} from "@/frontend/components/ui/transaction-list";

function createDate(daysAgo: number, hours: number, minutes: number): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString();
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    name: "Lucía Méndez",
    note: "Café de ayer",
    amount: -4.5,
    date: createDate(0, 9, 12),
    type: "out",
  },
  {
    id: "2",
    name: "Mateo Ruiz",
    note: "Cena split",
    amount: 23,
    date: createDate(0, 8, 45),
    type: "in",
  },
  {
    id: "3",
    name: "Sofía Paz",
    note: "Taxi compartido",
    amount: -12.3,
    date: createDate(1, 19, 30),
    type: "out",
  },
  {
    id: "4",
    name: "Diego Vera",
    note: "Alquiler parcial",
    amount: 150,
    date: createDate(1, 14, 15),
    type: "in",
  },
  {
    id: "5",
    name: "Ana Cruz",
    note: "Regalo cumpleaños",
    amount: -25,
    date: createDate(18, 11, 0),
    type: "out",
  },
  {
    id: "6",
    name: "Carlos Núñez",
    note: "Pago pendiente",
    amount: 40,
    date: createDate(20, 16, 20),
    type: "request",
  },
  {
    id: "7",
    name: "Elena Torres",
    note: "Servicio freelance",
    amount: 85,
    date: createDate(35, 10, 30),
    type: "in",
  },
  {
    id: "8",
    name: "Pablo Soto",
    note: "Compra grupal",
    amount: -18.75,
    date: createDate(42, 18, 45),
    type: "out",
  },
];

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeTab, setActiveTab] = React.useState<TransactionTab>("all");

  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-col bg-background px-4 py-6">
      <header className="mb-6 flex items-center justify-between">
        <button
          type="button"
          aria-label="Volver"
          className="flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
        >
          <ArrowLeft className="size-5" />
        </button>

        <h1 className="text-lg font-semibold text-foreground">Transacciones</h1>

        <button
          type="button"
          aria-label="Filtrar transacciones"
          className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted"
        >
          <SlidersHorizontal className="size-4" />
        </button>
      </header>

      <TransactionList
        transactions={mockTransactions}
        searchQuery={searchQuery}
        activeTab={activeTab}
        onSearch={setSearchQuery}
        onTabChange={(tab) => setActiveTab(tab as TransactionTab)}
      />
    </div>
  );
}
