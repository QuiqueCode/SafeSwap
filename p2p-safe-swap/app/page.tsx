import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";
import { Wordmark } from "@/frontend/components/brand/Logo";
import { Reveal } from "@/frontend/components/motion/reveal";

const TRUST_POINTS = [
  { icon: ShieldCheck, label: "Escrow-secured" },
  { icon: Zap, label: "~5s settlement" },
  { icon: Globe, label: "Built on Stellar" },
] as const;

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-16">
      {/* ambient brand glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
      </div>

      <Reveal className="flex w-full max-w-xl flex-col items-center text-center">
        <Wordmark className="mb-10" />

        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          <span className="size-1.5 rounded-full bg-primary" />
          Decentralized P2P · Built on Stellar
        </span>

        <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
          Swap USDC, peer to peer,{" "}
          <span className="text-grad">secured by escrow.</span>
        </h1>

        <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
          SafeSwap is the transparent marketplace to transfer USDC between
          Stellar wallets — settled in seconds and protected end-to-end by smart
          contracts.
        </p>

        <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/p2p/orders"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            Browse orders
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/transactions"
            className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-card px-7 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            View transactions
          </Link>
        </div>

        <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 border-t border-border pt-7 text-sm font-medium text-muted-foreground">
          {TRUST_POINTS.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2">
              <Icon className="size-4 text-primary" />
              {label}
            </li>
          ))}
        </ul>
      </Reveal>
    </main>
  );
}
