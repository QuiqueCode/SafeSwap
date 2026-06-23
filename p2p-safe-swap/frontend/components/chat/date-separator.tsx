import { cn } from "@/lib/utils";

export interface DateSeparatorProps {
  label: string;
  className?: string;
}

export function DateSeparator({ label, className }: DateSeparatorProps) {
  return (
    <div
      data-slot="chat-date-separator"
      role="separator"
      aria-label={label}
      className={cn("flex items-center justify-center py-2", className)}
    >
      <span className="rounded-full bg-muted px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
