import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export type PillarVariant = "A" | "B" | "C";

interface Props {
  variant: PillarVariant;
  tag: string;
  name: string;
  meta?: ReactNode;
  children: ReactNode;
  className?: string;
}

const wrapper: Record<PillarVariant, string> = {
  A: "bg-[linear-gradient(180deg,#faf3df_0%,#fbfaf6_64px)]",
  B: "bg-[linear-gradient(180deg,#ede6f3_0%,#fbfaf6_64px)]",
  C: "bg-dark text-[#e8eaef] border-[#0d1622]",
};

const head: Record<PillarVariant, string> = {
  A: "bg-[#f7ecc6] border-[#ead9a8]",
  B: "bg-[#e6dcef] border-[#d6c9e3]",
  C: "bg-[#131c2c] border-[#2b3648]",
};

const tagPill: Record<PillarVariant, string> = {
  A: "bg-gold text-dark",
  B: "bg-plum text-white",
  C: "bg-gold text-dark",
};

const nameColor: Record<PillarVariant, string> = {
  A: "text-gold-ink",
  B: "text-plum-ink",
  C: "text-white",
};

const metaColor: Record<PillarVariant, string> = {
  A: "text-[#6b7280]",
  B: "text-[#6b7280]",
  C: "text-[#8d97a8]",
};

export function SectionPillar({ variant, tag, name, meta, children, className }: Props) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-[12px] border border-line shadow-elev-md",
        wrapper[variant],
        className,
      )}
    >
      <div className={cn("flex items-baseline gap-3.5 border-b px-[22px] pb-3.5 pt-4", head[variant])}>
        <span
          className={cn(
            "rounded font-mono text-[11px] font-medium tracking-[0.1em] px-2 py-[3px]",
            tagPill[variant],
          )}
        >
          {tag}
        </span>
        <span
          className={cn(
            "font-serif text-[19px] font-medium tracking-tight",
            nameColor[variant],
          )}
        >
          {name}
        </span>
        {meta && (
          <span
            className={cn(
              "ml-auto text-[11.5px] uppercase tracking-[0.04em]",
              metaColor[variant],
            )}
          >
            {meta}
          </span>
        )}
      </div>
      <div className="p-[22px]">{children}</div>
    </section>
  );
}
