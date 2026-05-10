import type { ReactNode } from "react";
import { cn } from "../lib/cn";

interface Props {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  titleClassName?: string;
}

export function PageHeader({ eyebrow, title, description, className, titleClassName }: Props) {
  return (
    <header className={cn("mb-8", className)}>
      {eyebrow && (
        <div className="mb-2 text-[11px] uppercase tracking-[0.16em] text-[#6b7280]">
          {eyebrow}
        </div>
      )}
      <h1
        className={cn(
          "m-0 mb-2.5 font-serif text-[36px] font-medium leading-[1.1] tracking-[-0.02em] text-ink",
          titleClassName,
        )}
      >
        {title}
      </h1>
      {description && (
        <p className="max-w-[720px] text-[15px] leading-[1.55] text-ink-soft">{description}</p>
      )}
    </header>
  );
}
