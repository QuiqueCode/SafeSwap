import * as React from "react";
import { cn } from "@/lib/utils";

export interface DateGroupProps extends React.ComponentProps<"h3"> {
  label: string;
}

export function DateGroup({ label, className, ...props }: DateGroupProps) {
  return (
    <h3
      data-slot="date-group"
      className={cn(
        "px-1 text-[11px] font-normal uppercase tracking-[0.18em] text-muted-foreground",
        className
      )}
      {...props}
    >
      {label}
    </h3>
  );
}
