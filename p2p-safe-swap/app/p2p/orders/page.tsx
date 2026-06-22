"use client";

import { useState } from "react";
import { P2POrderList } from "@/frontend/components/p2p";
import type { OrderMode, P2POrder } from "@/frontend/components/p2p";

const MOCK_ORDERS: P2POrder[] = [
  {
    id: "ord-diego-v",
    user: {
      name: "Diego V.",
      initials: "DV",
      verified: true,
      rating: 4.95,
      opsCount: 612,
    },
    price: 0.9201,
    currencyPair: { base: "EUR", quote: "USDT" },
    available: 5000,
    limits: { min: 200, max: 3000 },
    windowMinutes: 20,
    paymentMethods: ["SEPA", "Wise"],
  },
  {
    id: "ord-ana-c",
    user: {
      name: "Ana C.",
      initials: "AC",
      verified: true,
      rating: 4.85,
      opsCount: 198,
    },
    price: 0.9195,
    currencyPair: { base: "EUR", quote: "USDT" },
    available: 980,
    limits: { min: 50, max: 600 },
    windowMinutes: 15,
    paymentMethods: ["Bizum"],
  },
  {
    id: "ord-carlos-l",
    user: {
      name: "Carlos L.",
      initials: "CL",
      verified: false,
      rating: 4.6,
      opsCount: 41,
    },
    price: 0.9188,
    currencyPair: { base: "EUR", quote: "USDT" },
    available: 220,
    limits: { min: 20, max: 200 },
    windowMinutes: 10,
    paymentMethods: ["Revolut"],
  },
];

const BEST_PRICE = 0.9201;

export default function OrdersPage() {
  const [mode, setMode] = useState<OrderMode>("buy");

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col">
      <P2POrderList
        orders={MOCK_ORDERS}
        bestPrice={BEST_PRICE}
        mode={mode}
        onModeChange={setMode}
        onBuy={(orderId) => {
          console.log("Order action:", { mode, orderId });
        }}
      />
    </main>
  );
}
