import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../Icon";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children: ReactNode;
}

export function Chip({ active, className, children, ...rest }: ChipProps) {
  return (
    <button
      type="button"
      {...rest}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-[7px] text-[12.5px] transition-all duration-100 select-none",
        active
          ? "bg-dark text-white border-dark"
          : "bg-bg-elev text-ink-soft border-line-strong hover:border-gold",
        className,
      )}
    >
      {active && (
        <span className="text-gold">
          <Icon name="check" size={11} stroke={2.5} />
        </span>
      )}
      {children}
    </button>
  );
}
