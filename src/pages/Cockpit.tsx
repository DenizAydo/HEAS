import { Pill } from "../components/ui/Pill";
import { PageHeader } from "../components/PageHeader";
import { VignetteCard } from "../components/VignetteCard";
import { VIGNETTES } from "../data";
import { formatClockTime, greeting } from "../lib/time";
import type { DecisionMap } from "../types";

interface Props {
  decisions: DecisionMap;
  openLens: (id: string) => void;
  lastSync: Date;
}

export function Cockpit({ decisions, openLens, lastSync }: Props) {
  const decided = Object.keys(decisions).length;
  const total = VIGNETTES.length;
  const open = total - decided;
  const today = lastSync.toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });
  const greet = greeting(lastSync);
  const title =
    open === 0
      ? `${greet} - all recommendations reviewed`
      : open === 1
        ? `${greet} - 1 recommendation is waiting for your approval`
        : `${greet} - ${open} recommendations are waiting for your approval`;
  const description =
    open === 0
      ? "You're caught up. New recommendations will appear here as they are prepared."
      : `${open === 1 ? "One operational decision" : `${open} operational decisions`} for your areas of responsibility ${open === 1 ? "is" : "are"} ready for review. Briefly review each recommendation.`;

  return (
    <div>
      <PageHeader eyebrow={`Inbox - ${today}`} title={title} description={description} />

      <div className="mb-6 flex flex-wrap items-center gap-3.5">
        <Pill tone="neutral" className="font-mono px-3 py-1.5">
          {total} recommendations today
        </Pill>
        <Pill tone="green" className="font-mono px-3 py-1.5">
          {decided} approved
        </Pill>
        <Pill tone="amber" className="font-mono px-3 py-1.5">
          {open} open
        </Pill>
        <span className="w-full text-[12px] text-[#6b7280] sm:ml-auto sm:w-auto">
          Last sync {formatClockTime(lastSync)} - auto every 30 min
        </span>
      </div>

      <div className="grid gap-[18px] [grid-template-columns:repeat(auto-fill,minmax(min(100%,330px),1fr))]">
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
