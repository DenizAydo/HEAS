import { useEffect, useState } from "react";
import { Icon } from "../Icon";
import { cn } from "../../lib/cn";
import type { Vignette } from "../../types";

interface Props {
  v: Vignette;
}

export function ReasonCard({ v }: Props) {
  const [showReason, setShowReason] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (!showReason) return;
    setPage(0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowReason(false);
      if (e.key === "ArrowRight") setPage((p) => Math.min(1, p + 1));
      if (e.key === "ArrowLeft") setPage((p) => Math.max(0, p - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showReason]);

  return (
    <>
      <section className="overflow-hidden rounded-[12px] border border-line bg-[linear-gradient(180deg,#faf3df_0%,#fbfaf6_64px)] shadow-elev-md">
        <div className="flex items-center gap-4 bg-[#f7ecc6] px-[22px] py-4">
          <span className="rounded bg-gold px-2 py-[3px] font-mono text-[11px] font-medium tracking-[0.1em] text-dark">
            A - Recommendation
          </span>
          <h3 className="m-0 flex-1 font-serif text-[22px] font-medium leading-[1.2] tracking-tight text-ink">
            {v.recommendation}
          </h3>
          <button
            type="button"
            onClick={() => setShowReason(true)}
            className="flex-shrink-0 rounded-md border border-gold/70 bg-bg-elev px-4 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-gold-ink transition-colors hover:bg-[#fbfaf6]"
          >
            View reason
          </button>
        </div>
      </section>

      {showReason && (
        <div
          className="fixed inset-0 z-50 flex animate-fadeIn items-center justify-center bg-ink/45 p-6 backdrop-blur-[2px]"
          onClick={() => setShowReason(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Recommendation reason"
        >
          <div
            className="w-full max-w-[640px] animate-pop overflow-hidden rounded-xl bg-bg-elev shadow-elev-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#ead9a8] bg-[#f7ecc6] px-[26px] pb-3.5 pt-[22px]">
              <div>
                <div className="m-0 text-[11px] uppercase tracking-[0.16em] text-gold-ink">
                  A - Recommendation
                </div>
                <h3 className="m-0 my-1 font-serif text-[22px] font-medium tracking-tight text-ink">
                  {v.recommendation}
                </h3>
                <div className="text-[12.5px] text-[#6b7280]">Why this is recommended</div>
              </div>
              <button
                onClick={() => setShowReason(false)}
                aria-label="Close"
                className="p-1.5 text-[#6b7280] hover:text-ink"
              >
                <Icon name="x" size={18} />
              </button>
            </div>

            <div className="px-[26px] py-[22px]">
              {page === 0 ? <KeyIndicatorsPanel v={v} /> : <MethodologyPanel v={v} />}
            </div>

            <div className="flex items-center justify-between gap-2.5 border-t border-line bg-[#f3efe4] px-[26px] py-3.5">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                aria-label="Previous"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-line-strong bg-bg-elev text-ink-soft transition-colors hover:bg-[#ede9dd] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Icon name="back" size={14} />
              </button>
              <div className="flex items-center gap-2">
                {[0, 1].map((i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPage(i)}
                    aria-label={`Go to page ${i + 1}`}
                    aria-current={page === i ? "true" : undefined}
                    className={cn(
                      "h-2 w-2 rounded-full transition-colors",
                      page === i ? "bg-gold" : "bg-[#cdc7b6] hover:bg-[#a8a290]",
                    )}
                  />
                ))}
                <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[#6b7280]">
                  {page === 0 ? "Key Indicators" : "Data Sources"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(1, p + 1))}
                disabled={page === 1}
                aria-label="Next"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-line-strong bg-bg-elev text-ink-soft transition-colors hover:bg-[#ede9dd] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Icon name="arrow" size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function KeyIndicatorsPanel({ v }: { v: Vignette }) {
  return (
    <div>
      <div className="mb-3.5 flex items-center gap-2.5">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gold/85 font-mono text-[12px] font-semibold text-dark">
          2
        </span>
        <h4 className="m-0 font-serif text-[18px] font-medium tracking-tight text-ink">
          Key Indicators
        </h4>
      </div>
      <div className="flex flex-col gap-1.5">
        {v.features.map((f, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-md bg-[#f3efe4] px-3.5 py-2.5"
          >
            <span
              className={cn(
                "h-2 w-2 flex-none rounded-full",
                f.flag === "ok" ? "bg-green" : "bg-[#9aa1ae]",
              )}
            />
            <span className="flex-1 text-[13.5px] text-ink">{f.key}</span>
            <span className="font-mono text-[12px] text-[#6b7280]">{f.weight}%</span>
            <span
              className={cn(
                "min-w-[80px] text-right font-mono text-[12.5px] font-semibold",
                f.flag === "ok" ? "text-green" : "text-[#6b7280]",
              )}
            >
              {f.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MethodologyPanel({ v }: { v: Vignette }) {
  return (
    <div>
      <div className="mb-3.5 flex items-center gap-2.5">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gold/85 font-mono text-[12px] font-semibold text-dark">
          3
        </span>
        <h4 className="m-0 font-serif text-[18px] font-medium tracking-tight text-ink">
          Data Sources & Methodology
        </h4>
      </div>
      <p className="m-0 mb-3 text-[13.5px] leading-[1.6] text-ink-soft">
        <span className="font-medium text-ink">Training data:</span> {v.trainingData}.{" "}
        <span className="font-medium text-ink">Model type:</span> {v.modelType}.
      </p>
      <p className="m-0 text-[13.5px] leading-[1.6] text-ink-soft">
        <span className="font-medium text-ink">Feature inputs:</span> {v.featureInputs}.{" "}
        <span className="font-semibold text-ink">Not included:</span> {v.notIncluded}.
      </p>
    </div>
  );
}
