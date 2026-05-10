import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ className, children, ...rest }: CardProps) {
  return (
    <div
      {...rest}
      className={cn(
        "rounded-[10px] border border-line bg-bg-elev shadow-elev-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
