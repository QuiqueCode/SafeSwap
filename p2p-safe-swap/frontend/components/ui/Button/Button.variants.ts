import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-semibold tracking-wide transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-97 cursor-pointer select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white shadow-xs hover:bg-primary/90 active:bg-primary/95 dark:text-zinc-50",
        ghost:
          "border border-solid border-zinc-200 bg-transparent text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 active:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-50 dark:active:bg-zinc-800/80",
        danger:
          "bg-red-50 text-red-600 border border-solid border-red-100 hover:bg-red-100/80 hover:text-red-700 active:bg-red-200/60 dark:bg-red-950/20 dark:text-red-400 dark:border-red-950/50 dark:hover:bg-red-950/40 dark:hover:text-red-300 dark:active:bg-red-950/60",
      },
      size: {
        sm: "text-xs ps-3 pe-3 pt-1 pb-1 min-h-[28px]",
        md: "text-sm ps-5 pe-5 pt-1.5 pb-1.5 min-h-[34px]",
        lg: "text-base ps-6 pe-6 pt-2 pb-2 min-h-[40px] sm:ps-7 sm:pe-7",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export { buttonVariants };
