import { Button } from "../ui/Button";
import { Pill } from "../ui/Pill";
import { Icon } from "../Icon";
import { SectionPillar } from "./SectionPillar";
import type { Decision, Vignette } from "../../types";

interface Props {
  v: Vignette;
  decision?: Decision;
  context: string;
  justification: string;
  onContextChange: (value: string) => void;
  onJustificationChange: (value: string) => void;
  onAccept: () => void;
  onOpenOverride: () => void;
}

export function DecisionSection({
  v: _v,
  decision,
  context,
  justification,
  onContextChange,
  onJustificationChange,
  onAccept,
  onOpenOverride,
}: Props) {
  if (decision) {
    const isAccept = decision.kind === "accepted";
    return (
      <SectionPillar
        variant="C"
        tag="C - Decision"
        name="Your Decision - final"
        meta={new Date(decision.ts).toLocaleString("en-US")}
      >
        <div className="flex items-start gap-4">
          <div
            className="flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-full"
            style={{
              background: isAccept ? "rgba(79,122,74,0.25)" : "rgba(168,80,62,0.25)",
              color: isAccept ? "#a8d5a4" : "#f3a48f",
            }}
          >
            <Icon name={isAccept ? "check" : "x"} size={20} stroke={2.2} />
          </div>
          <div className="flex-1">
            <div className="mb-1.5 font-serif text-[21px] tracking-tight text-white">
              {isAccept
                ? "Approved - moving to execution"
                : "Manual decision - rationale documented"}
            </div>
            <div className="mb-4 text-[13px] text-[#a8b1c1]">
              {isAccept
                ? "The recommendation was approved and handed over to the operational systems."
                : "You overrode the recommendation. The rationale is captured in the audit log."}
            </div>
            {!isAccept && decision.kind === "override" && decision.tags.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-1.5">
                {decision.tags.map((t) => (
                  <Pill key={t} tone="gold">
                    {t}
                  </Pill>
                ))}
              </div>
            )}
            <div className="grid gap-3 md:grid-cols-2">
              <RecordedField label="Context not in data" value={decision.context} />
              <RecordedField label="Justification" value={decision.justification} />
            </div>
          </div>
        </div>
      </SectionPillar>
    );
  }

  const contextReady = context.trim().length >= 1;
  const justificationReady = justification.trim().length >= 1;
  const canAdvance = contextReady && justificationReady;

  return (
    <SectionPillar
      variant="C"
      tag="C - DF3"
      name="Decision"
      meta="Approve or override"
    >
      <div className="mb-[18px] grid gap-3.5 md:grid-cols-2">
        <DecisionTextarea
          label="Add context which is not included in data"
          hint="Anything you know about the situation that the data model does not capture."
          placeholder="e.g. The supplier confirmed a delayed shipment by phone this morning."
          value={context}
          ready={contextReady}
          onChange={onContextChange}
        />
        <DecisionTextarea
          label="Justification reason"
          hint="Why this recommendation should be accepted or overridden."
          placeholder="e.g. Risk profile matches our policy and the affected crew agrees."
          value={justification}
          ready={justificationReady}
          onChange={onJustificationChange}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary" onClick={onAccept} disabled={!canAdvance}>
          <Icon name="check" size={14} stroke={2.2} />
          Approve recommendation
        </Button>
        <Button variant="danger" onClick={onOpenOverride} disabled={!canAdvance}>
          <Icon name="x" size={14} stroke={2.2} />
          Override
        </Button>
        {!canAdvance && (
          <span className="text-[12px] text-[#8d97a8]">
            Fill both fields with at least one character to continue.
          </span>
        )}
      </div>
    </SectionPillar>
  );
}

function DecisionTextarea({
  label,
  hint,
  placeholder,
  value,
  ready,
  onChange,
}: {
  label: string;
  hint: string;
  placeholder: string;
  value: string;
  ready: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-2 text-[12px] font-medium tracking-[0.01em] text-white">
        {label}
        <InfoTip text={hint} />
        <span
          className={
            ready
              ? "rounded bg-[rgba(79,122,74,0.25)] px-1.5 py-[1px] font-mono text-[10px] uppercase tracking-[0.12em] text-[#a8d5a4]"
              : "rounded bg-white/10 px-1.5 py-[1px] font-mono text-[10px] uppercase tracking-[0.12em] text-[#8d97a8]"
          }
        >
          {ready ? "Ready" : "Required"}
        </span>
      </label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[88px] w-full resize-y rounded-md border border-[#2b3648] bg-[#0d1622] px-3 py-2.5 text-[13.5px] leading-[1.5] text-white outline-none transition-[border-color,box-shadow] placeholder:text-[#6b758a] focus:border-gold focus:shadow-[0_0_0_3px_rgba(212,168,83,0.25)]"
      />
    </div>
  );
}

function InfoTip({ text }: { text: string }) {
  return (
    <span className="group relative inline-flex">
      <button
        type="button"
        tabIndex={0}
        aria-label={text}
        className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white/10 text-[10px] font-semibold text-[#a8b1c1] outline-none transition-colors hover:bg-white/20 hover:text-white focus-visible:bg-white/20 focus-visible:text-white"
      >
        i
      </button>
      <span
        role="tooltip"
        className="pointer-events-none absolute left-0 top-full z-20 mt-1.5 hidden w-[220px] rounded-md border border-white/15 bg-[#0d1622] px-3 py-2 text-[11.5px] font-normal normal-case leading-[1.5] tracking-normal text-[#dde1e9] shadow-elev-md group-hover:block group-focus-within:block"
      >
        {text}
      </span>
    </span>
  );
}

function RecordedField({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="rounded-md border border-white/10 bg-white/5 px-3.5 py-2.5">
      <div className="mb-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#8d97a8]">
        {label}
      </div>
      <div className="text-[13px] leading-[1.55] text-[#dde1e9]">{value}</div>
    </div>
  );
}
