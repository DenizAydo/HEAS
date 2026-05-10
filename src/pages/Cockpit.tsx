import { Pill } from "../components/ui/Pill";
import { PageHeader } from "../components/PageHeader";
import { VignetteCard } from "../components/VignetteCard";
import { VIGNETTES } from "../data";
import type { DecisionMap } from "../types";

interface Props {
  decisions: DecisionMap;
  openLens: (id: string) => void;
}

export function Cockpit({ decisions, openLens }: Props) {
  const decided = Object.keys(decisions).length;
  const total = VIGNETTES.length;
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  return (
    <div>
      <PageHeader
        eyebrow={`Inbox - ${today}`}
        title={`Good morning - ${total - decided} recommendations are waiting for approval`}
        description="Three operational decisions for your areas of responsibility were prepared overnight. Briefly review each recommendation."
      />

      <div className="mb-6 flex flex-wrap items-center gap-3.5">
        <Pill tone="neutral" className="font-mono px-3 py-1.5">
          {total} recommendations today
        </Pill>
        <Pill tone="green" className="font-mono px-3 py-1.5">
          {decided} approved
        </Pill>
        <Pill tone="amber" className="font-mono px-3 py-1.5">
          {total - decided} open
        </Pill>
        <span className="ml-auto text-[12px] text-[#6b7280]">
          Auto-sync every 15 min - last 07:42
        </span>
      </div>

      <div className="grid gap-[18px] [grid-template-columns:repeat(auto-fill,minmax(330px,1fr))]">
        {VIGNETTES.map((v, i) => (
          <VignetteCard
            key={v.id}
            v={v}
            idx={i}
            decision={decisions[v.id]}
            onOpen={() => openLens(v.id)}
          />
        ))}
      </div>
    </div>
  );
}
