import * as React from "react";
import { cn } from "@/lib/utils";

export interface WalletBadgeProps extends React.ComponentProps<"div"> {
  address: string;
  size?: "sm" | "md";
}

const sizeClasses = {
  sm: "size-9 text-xs",
  md: "size-11 text-sm",
} as const;

const badgeColors = [
  "bg-muted text-muted-foreground",
  "bg-primary/15 text-primary",
  "bg-accent text-accent-foreground",
  "bg-secondary text-secondary-foreground",
] as const;

function hashAddress(address: string): number {
  let hash = 0;
  for (let i = 0; i < address.length; i += 1) {
    hash = (hash + address.charCodeAt(i) * (i + 1)) % 2147483647;
  }
  return hash;
}

function getInitials(address: string): string {
  const normalized = address.replace(/^0x/i, "").replace(/[^a-zA-Z0-9]/g, "");
  if (normalized.length >= 2) {
    return normalized.slice(0, 2).toUpperCase();
  }
  return address.slice(0, 2).toUpperCase();
}

export function WalletBadge({
  address,
  size = "md",
  className,
  ...props
}: WalletBadgeProps) {
  const initials = getInitials(address);
  const colorClass = badgeColors[hashAddress(address) % badgeColors.length];

  return (
    <div
      data-slot="wallet-badge"
      title={address}
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-medium",
        sizeClasses[size],
        colorClass,
        className
      )}
      {...props}
    >
      {initials}
    </div>
  );
}
