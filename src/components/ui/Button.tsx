import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

type Variant = "primary" | "danger" | "ghost" | "dark";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-[18px] py-[11px] text-[13.5px] font-medium leading-none border border-transparent transition-[transform,background-color,border-color,color] duration-100 active:translate-y-px disabled:opacity-45 disabled:cursor-not-allowed disabled:active:translate-y-0";

const variants: Record<Variant, string> = {
  primary: "bg-green text-white hover:bg-[#426941]",
  danger: "bg-white text-red border-red hover:bg-red hover:text-white",
  ghost: "bg-transparent text-ink-soft border-line-strong hover:bg-[#ede9dd]",
  dark: "bg-dark text-white hover:bg-dark-soft",
};

export function Button({ variant = "ghost", className, children, ...rest }: ButtonProps) {
  return (
    <button {...rest} className={cn(base, variants[variant], className)}>
      {children}
    </button>
  );
}
