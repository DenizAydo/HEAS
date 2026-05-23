import { Icon } from "../Icon";
import { SectionPillar } from "./SectionPillar";
import type { Vignette } from "../../types";

interface Props {
  v: Vignette;
}

export function ReasonCard({ v }: Props) {
  return (
    <SectionPillar
      variant="A"
      tag="A - Hypothesis"
      name="Hypothesis Disclosure"
      meta="RECOMMENDATION - CONFIDENCE - FACTORS"
    >
      <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-gold/40 bg-bg-elev px-3 py-2">
        <Icon name="info" size={14} stroke={2} />
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-ink">
          Hypothesis - not a final verdict
        </span>
      </div>

      <h4 className="m-0 mb-5 font-serif text-[26px] font-medium leading-tight tracking-tight text-ink">
        {v.recommendation}
      </h4>

      <div className="mb-6 flex flex-wrap items-end justify-between gap-6 rounded-lg border border-line bg-bg-elev px-5 py-4">
        <div className="flex items-end gap-5">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6b7280]">
              Recommended
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-[44px] font-medium leading-none tracking-[-0.03em] text-ink">
                {v.recommendedCount}
              </span>
              <span className="text-[13px] text-ink-soft">{v.countUnit}</span>
            </div>
          </div>
          <div className="pb-1.5 text-[18px] text-ink-soft">{"←"}</div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6b7280]">
              Usual
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-[36px] font-medium leading-none tracking-[-0.03em] text-ink-soft">
                {v.usualCount}
              </span>
              <span className="text-[13px] text-ink-soft">{v.countUnit}</span>
            </div>
          </div>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-dark px-4 py-2 font-mono text-[12px] font-semibold tracking-[0.04em] text-gold">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          {v.confidence}% Confidence
        </span>
      </div>

      <div>
        <div className="mb-2.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#6b7280]">
          Factors behind the recommendation
        </div>
        <div className="overflow-hidden rounded-lg border border-line bg-bg-elev">
          <div className="grid grid-cols-[1fr_1fr] gap-x-4 border-b border-line bg-[#f3efe4] dark:bg-white/[0.04] px-4 py-2.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#6b7280]">
            <span>Factor</span>
            <span>Contribution</span>
          </div>
          {v.factors.map((f, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_1fr] gap-x-4 border-b border-line px-4 py-3 last:border-b-0"
            >
              <span className="text-[13.5px] text-ink">{f.name}</span>
              <span className="font-mono text-[12.5px] text-ink-soft">{f.contribution}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 mb-0 text-[11.5px] italic leading-[1.55] text-[#6b7280]">
        Factors and weightings derive from the configured model. The forecast is based on
        variables captured in the dataset and is limited to those.
      </p>
    </SectionPillar>
  );
}
