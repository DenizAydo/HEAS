import type { Vignette } from "../../types";

interface Props {
  v: Vignette;
}

function initialsFor(name: string): string {
  return name
    .split(/\s+/)
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ScenarioCard({ v }: Props) {
  return (
    <section className="relative overflow-hidden rounded-[12px] border border-line bg-bg-elev shadow-elev-md">
      <span className="absolute inset-y-0 left-0 w-1 bg-[linear-gradient(180deg,#d4a853_0%,#6b5b95_100%)]" />

      <div className="flex items-center gap-3 border-b border-line-strong bg-[linear-gradient(90deg,#f7ecc6_0%,#ece6f3_100%)] py-3 pl-[26px] pr-[22px] dark:bg-none dark:bg-gold-soft/40">
        <span className="rounded bg-dark px-2.5 py-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-gold">
          Situation
        </span>
        <span className="text-[11.5px] font-medium uppercase tracking-[0.08em] text-gold-ink">
          {v.domain}
        </span>
        <span className="flex-1" />
        <span className="text-[11px] italic tracking-[0.06em] text-[#6b7280]">
          Operational context - captured automatically
        </span>
      </div>

      <div className="grid gap-x-8 gap-y-[22px] px-[26px] pb-[26px] pt-6 lg:[grid-template-columns:minmax(220px,280px)_1fr] lg:[grid-template-rows:auto_auto]">
        <div className="flex items-center gap-3.5 lg:[grid-column:1] lg:[grid-row:1]">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full font-serif text-[22px] font-semibold tracking-tight text-dark shadow-elev-sm ring-1 ring-inset ring-ink/10"
            style={{ background: "radial-gradient(circle at 30% 30%, #faf3df, #d4a853 80%)" }}
          >
            {initialsFor(v.person)}
          </div>
          <div>
            <div className="font-serif text-[22px] font-medium leading-tight tracking-tight">
              {v.person}
            </div>
            <div className="mt-0.5 text-[13px] text-[#6b7280]">{v.role}</div>
          </div>
        </div>

        <div className="flex flex-col gap-3 self-start rounded-lg border border-line bg-[#f3efe4] px-4 py-3.5 dark:bg-white/[0.04] lg:[grid-column:1] lg:[grid-row:2]">
          <ScenarioMetaItem label="Setting" value={v.setting} />
          <ScenarioMetaItem label="Decision" value={v.decisionLabel} />
          <ScenarioMetaItem label="Domain" value={v.domain} />
        </div>

        <div className="relative pl-7 pt-2 lg:pl-9 lg:[grid-column:2] lg:[grid-row:1/span_2]">
          <span className="absolute -left-0.5 -top-2 font-serif text-[88px] leading-none text-gold/55">
            "
          </span>
          <p className="m-0 font-serif text-[17px] leading-[1.55] tracking-[-0.005em] text-ink">
            {v.fullSituation}
          </p>
        </div>
      </div>
    </section>
  );
}

function ScenarioMetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#6b7280]">
        {label}
      </span>
      <span className="text-[13px] text-ink">{value}</span>
    </div>
  );
}
