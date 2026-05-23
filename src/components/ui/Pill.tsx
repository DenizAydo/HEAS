import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export type PillTone = "green" | "amber" | "red" | "neutral" | "gold" | "plum";

interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: PillTone;
  dot?: boolean;
  children: ReactNode;
}

const tones: Record<PillTone, { bg: string; text: string; dot: string }> = {
  green: { bg: "bg-green-soft", text: "text-green", dot: "bg-green" },
  amber: { bg: "bg-amber-soft", text: "text-amber", dot: "bg-amber" },
  red: { bg: "bg-red-soft", text: "text-red", dot: "bg-red" },
  neutral: { bg: "bg-line", text: "text-ink-soft", dot: "bg-ink-soft/60" },
  gold: { bg: "bg-gold-soft", text: "text-gold-ink", dot: "bg-gold" },
  plum: { bg: "bg-plum-soft", text: "text-plum-ink", dot: "bg-plum" },
};

export function Pill({ tone = "neutral", dot, className, children, ...rest }: PillProps) {
  const t = tones[tone];
  return (
    <span
      {...rest}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-[3px] text-[11.5px] font-medium leading-tight tracking-[0.01em]",
        t.bg,
        t.text,
        className,
      )}
    >
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full", t.dot)} />}
      {children}
    </span>
  );
}
