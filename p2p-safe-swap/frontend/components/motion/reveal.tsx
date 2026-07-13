"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const variants: Record<string, Variants> = {
  up: { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.96 }, show: { opacity: 1, scale: 1 } },
};

export interface RevealProps {
  children: ReactNode;
  variant?: keyof typeof variants;
  delay?: number;
  className?: string;
  once?: boolean;
}

/**
 * Entrance animation wrapper. Fades/slides content in as it enters the
 * viewport. Honors prefers-reduced-motion by rendering statically.
 */
export function Reveal({
  children,
  variant = "up",
  delay = 0,
  className,
  once = true,
}: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={variants[variant]}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
