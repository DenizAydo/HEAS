import type { KeyboardEvent } from "react";
import { Icon } from "./Icon";
import { Pill } from "./ui/Pill";
import { Button } from "./ui/Button";
import { StatusPill } from "./StatusPill";
import {
  confidenceBucket,
  confidenceColor,
  confidenceLabel,
  confidencePillTone,
} from "../lib/confidence";
import type { Decision, Vignette } from "../types";

interface Props {
  v: Vignette;
  decision?: Decision;
  onOpen: () => void;
  idx: number;
}

export function VignetteCard({ v, decision, onOpen, idx }: Props) {
  const status = decision ? decision.kind : "open";
  const bucket = confidenceBucket(v.confidence);
  const confColor = confidenceColor(v.confidence);
  const confTone = confidencePillTone(v.confidence);

  const handleKey = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") onOpen();
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={handleKey}
      style={{ animationDelay: `${idx * 60}ms` }}
      className="group relative animate-slideUp cursor-pointer overflow-hidden rounded-[12px] border border-line bg-bg-elev px-[22px] pb-5 pt-[22px] transition-[transform,box-shadow,border-color] duration-150 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-elev-md"
    >
      <span className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-gold transition-transform duration-200 ease-[cubic-bezier(.2,.9,.3,1)] group-hover:scale-y-100" />

      <div className="mb-3.5 flex items-center justify-between">
        <Pill tone="neutral" className="font-mono text-[10.5px] uppercase tracking-[0.06em]">
          {v.domain}
        </Pill>
        <StatusPill status={status} />
      </div>

      <div className="mb-1.5 flex items-baseline gap-2.5">
        <h3 className="m-0 font-serif text-[22px] font-medium tracking-tight">{v.person}</h3>
        <span className="text-[13px] text-[#6b7280]">- {v.role}</span>
      </div>
      <div className="mb-3.5 text-[12.5px] uppercase tracking-[0.04em] text-[#6b7280]">
        {v.decisionLabel} - {v.headline}
      </div>
      <p className="mb-[18px] mt-0 text-[13.5px] leading-[1.55] text-ink-soft">{v.summary}</p>

      <div className="flex items-center justify-between border-t border-line pt-3.5">
        <div>
          <div className="mb-0.5 text-[10.5px] uppercase tracking-[0.12em] text-[#6b7280]">
            AI confidence
          </div>
          <div className="flex items-baseline gap-2">
            <span
              className="font-serif text-[30px] font-medium leading-none tracking-[-0.03em]"
              style={{ color: confColor }}
            >
              {v.confidence}
            </span>
            <span className="text-[13px] text-[#6b7280]">%</span>
            <Pill tone={confTone} dot className="ml-2">
              {confidenceLabel(v.confidence)} ({bucket})
            </Pill>
          </div>
        </div>
        <Button
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
        >
          Review
          <Icon name="arrow" size={14} />
        </Button>
      </div>
    </article>
  );
}
