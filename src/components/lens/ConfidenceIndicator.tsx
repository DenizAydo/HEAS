import { useEffect, useState } from "react";
import { Icon } from "../Icon";
import { SectionPillar } from "./SectionPillar";
import type { Vignette } from "../../types";

interface Props {
  v: Vignette;
}

export function ConfidenceIndicator({ v }: Props) {
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    const t = window.setTimeout(() => setFilled(v.confidence), 80);
    return () => window.clearTimeout(t);
  }, [v.confidence]);

  return (
    <SectionPillar
      variant="B"
      tag="B - Confidence"
      name="Model Confidence"
      meta="How certain is the AI here?"
    >
      <div className="grid grid-cols-[auto_1fr] items-center gap-8 max-[680px]:grid-cols-1">
        <div>
          <div className="flex items-baseline gap-1.5 text-plum">
            <span className="font-serif text-[76px] font-medium leading-none tracking-[-0.04em]">
              {v.confidence}
            </span>
            <span className="font-serif text-[24px]">%</span>
          </div>
          <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-plum-ink">
            Model confidence
          </div>
        </div>
        <div>
          <div className="relative h-2 overflow-hidden rounded bg-plum/15">
            <div
              className="absolute inset-0 rounded bg-plum transition-[width] duration-700 ease-[cubic-bezier(.2,.9,.3,1)]"
              style={{ width: `${filled}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between font-mono text-[11px] text-[#6b7280]">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>
      </div>

      <div className="mt-[22px] flex items-start gap-3 rounded-lg border border-[#d6c9e3] bg-white px-[18px] py-3.5">
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-plum-soft text-plum">
          <Icon name="alert" size={14} stroke={2} />
        </div>
        <div>
          <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-plum-ink">
            Known model limitation
          </div>
          <div className="text-[13.5px] leading-[1.55] text-ink">{v.caveat}</div>
          <div className="mt-1.5 text-[12px] text-[#6b7280]">
            Affected group: <span className="font-mono">{v.caveatSubgroup}</span>
          </div>
        </div>
      </div>
    </SectionPillar>
  );
}
