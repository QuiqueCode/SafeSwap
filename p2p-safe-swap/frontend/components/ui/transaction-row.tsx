import * as React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { WalletBadge } from "@/frontend/components/ui/wallet-badge";

export interface TransactionRowProps extends React.ComponentProps<"div"> {
  address: string;
  memo?: string;
  timestamp: string;
  amount: number;
  direction: "in" | "out";
}

function truncateAddress(address: string, head = 4, tail = 4): string {
  if (address.length <= head + tail + 1) {
    return address;
  }

  return `${address.slice(0, head)}…${address.slice(-tail)}`;
}

function formatAmount(amount: number, direction: "in" | "out"): string {
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(amount));

  return direction === "in" ? `+${formatted}` : `−${formatted}`;
}

export function TransactionRow({
  address,
  memo,
  timestamp,
  amount,
  direction,
  className,
  ...props
}: TransactionRowProps) {
  const formattedAmount = formatAmount(amount, direction);

  return (
    <div
      data-slot="transaction-row"
      className={cn(
        "flex items-center gap-3 rounded-xl border bg-card p-3",
        className
      )}
      {...props}
    >
      <WalletBadge address={address} />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">
          {truncateAddress(address)}
        </p>
        {memo ? (
          <p className="truncate text-sm text-muted-foreground">{memo}</p>
        ) : null}
      </div>

      <div className="shrink-0 text-right">
        <p
          className={cn(
            "text-sm font-semibold tabular-nums",
            direction === "in" ? "text-primary" : "text-foreground"
          )}
        >
          {formattedAmount}
        </p>
        <div className="mt-0.5 flex items-center justify-end gap-1 text-xs text-muted-foreground">
          <Clock className="size-3.5 shrink-0" aria-hidden="true" />
          <span>{timestamp}</span>
        </div>
      </div>
    </div>
  );
}
