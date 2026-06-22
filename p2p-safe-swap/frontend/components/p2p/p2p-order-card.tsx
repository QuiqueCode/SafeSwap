"use client";

import { cn } from "@/lib/utils";
import { getCurrencySymbol } from "./currency";
import type { OrderMode, P2POrder } from "./types";

export interface P2POrderCardProps {
  order: P2POrder;
  mode: OrderMode;
  onAction: (orderId: string) => void;
  className?: string;
}

const AVATAR_PALETTE = [
  "bg-[#23C987] text-white",
  "bg-[#85CFBB] text-[#0E1C16]",
  "bg-[#95D6AB] text-[#0E1C16]",
  "bg-[#75CCA7] text-[#0E1C16]",
  "bg-[#98BE84] text-[#0E1C16]",
  "bg-[#A2DBD3] text-[#0E1C16]",
];

function pickAvatarColor(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return AVATAR_PALETTE[hash % AVATAR_PALETTE.length];
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
    value
  );
}

export function P2POrderCard({
  order,
  mode,
  onAction,
  className,
}: P2POrderCardProps) {
  const actionLabel = mode === "buy" ? "Comprar" : "Vender";
  const avatarClasses = pickAvatarColor(order.user.initials);

  return (
    <article
      data-slot="p2p-order-card"
      className={cn(
        "flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5",
        className
      )}
    >
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
              avatarClasses
            )}
            aria-hidden="true"
          >
            {order.user.initials}
          </div>

          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="truncate text-sm font-semibold text-foreground">
                {order.user.name}
              </span>
              {order.user.verified && (
                <span
                  className="inline-flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground"
                  aria-label="Verified user"
                  title="Verificado"
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-foreground"
                aria-hidden="true"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className="font-medium text-foreground">
                {order.user.rating.toFixed(2)}
              </span>
              <span aria-hidden="true">·</span>
              <span>{order.user.opsCount} ops</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end shrink-0">
          <span className="text-lg font-semibold tracking-tight text-foreground tabular-nums">
            {order.price.toFixed(4)}
          </span>
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {order.currencyPair.base} / {order.currencyPair.quote}
          </span>
        </div>
      </header>

      <dl className="grid grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-1.5 text-sm">
        <dt className="text-muted-foreground">Disponible</dt>
        <dd className="text-right font-medium text-foreground tabular-nums">
          {formatNumber(order.available)}
        </dd>
        <dd className="flex items-center gap-1.5 justify-self-end text-xs text-muted-foreground">
          <span>Ventana</span>
        </dd>

        <dt className="text-muted-foreground">Límites</dt>
        <dd className="text-right font-medium text-foreground tabular-nums">
          {formatNumber(order.limits.min)} – {formatNumber(order.limits.max)}{" "}
          {getCurrencySymbol(order.currencyPair.base)}
        </dd>
        <dd className="flex items-center gap-1.5 justify-self-end text-xs text-muted-foreground">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>{order.windowMinutes} min</span>
        </dd>
      </dl>

      <footer className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {order.paymentMethods.map((method) => (
            <span
              key={method}
              className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
            >
              {method}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onAction(order.id)}
          className={cn(
            "inline-flex items-center justify-center rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors",
            "hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          aria-label={`${actionLabel} a ${order.user.name}`}
        >
          {actionLabel}
        </button>
      </footer>
    </article>
  );
}
