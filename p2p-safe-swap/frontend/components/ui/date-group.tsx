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
        "px-1 text-xs font-medium uppercase tracking-wider text-muted-foreground",
        className
      )}
      {...props}
    >
      {label}
    </h3>
  );
}
