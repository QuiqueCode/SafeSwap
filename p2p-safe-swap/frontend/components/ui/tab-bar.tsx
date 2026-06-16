"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TabBarProps
  extends Omit<React.ComponentProps<"div">, "onChange"> {
  tabs: string[];
  activeIndex: number;
  onChange: (index: number) => void;
}

export function TabBar({
  tabs,
  activeIndex,
  onChange,
  className,
  ...props
}: TabBarProps) {
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let next = index;
    if (e.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    onChange(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div
      data-slot="tab-bar"
      role="tablist"
      aria-orientation="horizontal"
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-primary/5 p-1",
        className
      )}
      {...props}
    >
      {tabs.map((label, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={index}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            data-slot="tab-bar-tab"
            data-state={isActive ? "active" : "inactive"}
            role="tab"
            type="button"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              "whitespace-nowrap rounded-full px-5 py-2 text-sm transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
              isActive
                ? "bg-primary/15 font-medium text-primary"
                : "font-normal text-muted-foreground hover:text-foreground"
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
