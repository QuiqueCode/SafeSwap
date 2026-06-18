"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./Button.variants";
import type { ButtonProps } from "./types";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, label, onClick, ...props }, ref) => {
    return (
      <button
        type="button"
        className={cn(buttonVariants({ variant, size }), className)}
        onClick={onClick}
        ref={ref}
        {...props}
      >
        {label}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export { buttonVariants } from "./Button.variants";
export type { ButtonProps } from "./types";
