import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Pill } from "../components/ui/Pill";
import { Icon } from "../components/Icon";
import { PageHeader } from "../components/PageHeader";
import { VIGNETTES } from "../data";
import type { Decision, DecisionMap, OverrideDecision, Profile } from "../types";

interface Props {
  decisions: DecisionMap;
  profile: Profile;
  openVignette: (id: string) => void;
}

interface KPIProps {
  label: string;
  value: string | number;
  accent?: string;
  sub?: string;
}

function AuditField({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="rounded-md border border-line bg-[#fbfaf6] px-3 py-2">
      <div className="mb-0.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#6b7280]">
        {label}
      </div>
      <div className="text-[13px] leading-[1.55] text-ink-soft">{value}</div>
    </div>
  );
}

function KPI({ label, value, accent, sub }: KPIProps) {
  return (
    <div className="flex-1 rounded-[10px] border border-line bg-bg-elev px-[22px] py-[18px]">
      <div className="mb-1.5 text-[11px] uppercase tracking-[0.12em] text-[#6b7280]">{label}</div>
      <div
        className="font-serif text-[32px] font-medium leading-none tracking-[-0.03em]"
        style={{ color: accent ?? "#1a2332" }}
      >
        {value}
      </div>
      {sub && <div className="mt-1.5 text-[12px] text-[#6b7280]">{sub}</div>}
    </div>
  );
}

const tooltipStyle = {
  fontSize: 12,
  borderRadius: 6,
  border: "1px solid #d2cdbf",
};

type WithId<T> = T extends unknown ? T & { vid: string } : never;
type DecisionWithId = WithId<Decision>;
type OverrideWithId = WithId<OverrideDecision>;

function isOverride(d: DecisionWithId): d is OverrideWithId {
  return d.kind === "override";
}

export function Authority({ decisions, profile, openVignette }: Props) {
  const decisionList: DecisionWithId[] = Object.entries(decisions).map(([vid, d]) => ({
    vid,
    ...d,
  }));
  const total = decisionList.length;
  const overrides = decisionList.filter(isOverride);
  const accepts = decisionList.filter((d) => d.kind === "accepted");

  if (total === 0) {
    return (
      <div>
        <PageHeader
          eyebrow="Decision Insights"
          title="Decision Insights"
          description="Once you approve recommendations or make manual decisions, you will see an analysis here - as a basis for audit, model calibration, and your own reflection."
        />
        <div className="pattern-hatch rounded-[10px] border border-dashed border-line-strong px-8 py-14 text-center text-ink-soft">
          <Icon name="lock" size={28} color="#6b7280" />
          <div className="mt-3.5 font-serif text-[22px] text-ink">No decisions recorded yet</div>
          <div className="mt-2 text-[13.5px] text-[#6b7280]">
            Open the inbox and decide on a recommendation to activate insights.
          </div>
        </div>
      </div>
    );
  }

  const perVignette = VIGNETTES.map((v) => {
    const d = decisions[v.id];
    return {
      name: v.person,
      accept: d?.kind === "accepted" ? 1 : 0,
      override: d?.kind === "override" ? 1 : 0,
      open: d ? 0 : 1,
    };
  });

  const pieData = (
    [
      { name: "Approved", value: accepts.length, fill: "#4f7a4a" },
      { name: "Manual", value: overrides.length, fill: "#a8503e" },
      { name: "Open", value: VIGNETTES.length - total, fill: "#cdc7b6" },
    ] as const
  ).filter((d) => d.value > 0);

  const tagTally: Record<string, number> = {};
  overrides.forEach((o) => {
    o.tags.forEach((t) => {
      tagTally[t] = (tagTally[t] ?? 0) + 1;
    });
  });
  const tagData = Object.entries(tagTally)
    .map(([k, v]) => ({ name: k, value: v }))
    .sort((a, b) => b.value - a.value);

  const overrideRate = Math.round((overrides.length / total) * 100);

  const reflection = (() => {
    if (overrides.length === 0) {
      return {
        title: "High adoption rate",
        body: `You approved ${accepts.length} of ${total} recommendations. That is efficient - we recommend occasionally double-checking even high-confidence recommendations, especially when the context has changed.`,
      };
    }
    if (accepts.length === 0) {
      return {
        title: "Consistent manual decisions",
        body: `You made manual decisions in all ${overrides.length} cases. If a pattern emerges, we can tune the model more deliberately - review the most frequent rationales below.`,
      };
    }
    const dominant = tagData[0]?.name;
    return {
      title: "Differentiated decision pattern",
      body: `You approved ${accepts.length} and decided manually ${overrides.length} times. ${
        dominant ? `Most frequent rationale: "${dominant}". ` : ""
      }This mix is the goal - you use AI where it is reliable and take the wheel where your context knowledge matters.`,
    };
  })();

  return (
    <div>
      <PageHeader
        eyebrow="Decision Insights - Current Period"
        title="Your Decision Pattern"
        description="Overview of your approvals and manual decisions - as a basis for audit, model calibration, and reviews with your team."
      />

      <div className="mb-[18px] flex gap-3.5">
        <KPI label="Recommendations" value={total} sub={`${VIGNETTES.length - total} open`} />
        <KPI label="Approved" value={accepts.length} accent="#4f7a4a" sub="accepted directly" />
        <KPI label="Manual" value={overrides.length} accent="#a8503e" sub="with rationale" />
        <KPI label="Override rate" value={`${overrideRate}%`} accent="#6b4f1a" sub="period" />
      </div>

      <div className="mb-[18px] grid gap-[18px] lg:[grid-template-columns:1.2fr_0.8fr]">
        <Card className="px-6 py-[22px]">
          <div className="mb-1 text-[11px] uppercase tracking-[0.16em] text-[#6b7280]">
            Per recommendation
          </div>
          <div className="mb-3.5 font-serif text-[20px]">Approval vs. manual</div>
          <div className="h-60">
            <ResponsiveContainer>
              <BarChart data={perVignette} barCategoryGap={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2dfd5" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#3a4655" }}
                  axisLine={{ stroke: "#d2cdbf" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  axisLine={false}
                  tickLine={false}
                  ticks={[0, 1]}
                  domain={[0, 1]}
                />
                <Tooltip
                  cursor={{ fill: "rgba(212,168,83,0.08)" }}
                  contentStyle={tooltipStyle}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="accept" name="Approved" fill="#4f7a4a" radius={[4, 4, 0, 0]} />
                <Bar dataKey="override" name="Manual" fill="#a8503e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="open" name="Open" fill="#cdc7b6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="px-6 py-[22px]">
          <div className="mb-1 text-[11px] uppercase tracking-[0.16em] text-[#6b7280]">
            Distribution
          </div>
          <div className="mb-3.5 font-serif text-[20px]">Decision mix</div>
          <div className="h-60">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={84}
                  paddingAngle={2}
                >
                  {pieData.map((d, i) => (
                    <Cell key={i} fill={d.fill} stroke="#fbfaf6" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="mb-[18px] px-6 py-[22px]">
        <div className="mb-1 text-[11px] uppercase tracking-[0.16em] text-[#6b7280]">Audit Log</div>
        <div className="mb-3.5 font-serif text-[20px]">
          Most frequent rationales for manual decisions
        </div>
        {tagData.length === 0 ? (
          <div className="py-6 text-[13.5px] text-[#6b7280]">
            No manual decisions in this period.
          </div>
        ) : (
          <div style={{ height: Math.max(180, tagData.length * 44) }}>
            <ResponsiveContainer>
              <BarChart data={tagData} layout="vertical" margin={{ left: 24, right: 24 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2dfd5" horizontal={false} />
                <XAxis
                  type="number"
                  allowDecimals={false}
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#3a4655" }}
                  width={210}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(212,168,83,0.08)" }}
                  contentStyle={tooltipStyle}
                />
                <Bar dataKey="value" name="Frequency" fill="#d4a853" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>

      <Card
        className="border-[#ead9a8] px-8 py-7"
        style={{ background: "linear-gradient(180deg,#faf3df 0%,#fbfaf6 60%)" }}
      >
        <div className="mb-1.5 text-[11px] uppercase tracking-[0.16em] text-gold-ink">
          Period analysis
        </div>
        <h3 className="m-0 mb-3 font-serif text-[22px] font-medium tracking-tight">
          {reflection.title}
        </h3>
        <p className="m-0 max-w-[760px] text-[14.5px] leading-[1.6] text-ink-soft">
          {reflection.body}
        </p>
        {profile.years > 0 && (
          <div className="mt-3.5 flex flex-wrap gap-3.5 text-[12.5px] text-[#6b7280]">
            <span>
              Profile: <strong className="text-ink-soft">{profile.years} years leadership</strong>
            </span>
            <span>
              Domain: <strong className="text-ink-soft">{profile.domain}</strong>
            </span>
            <span>
              AI experience: <strong className="text-ink-soft">{profile.aiExp}</strong>
            </span>
          </div>
        )}
      </Card>

      {decisionList.length > 0 && (
        <div className="mt-[18px]">
          <div className="mb-2.5 text-[11px] uppercase tracking-[0.16em] text-[#6b7280]">
            Audit Log - Decision Rationale
          </div>
          <div className="grid gap-2.5">
            {decisionList.map((d) => {
              const v = VIGNETTES.find((x) => x.id === d.vid);
              if (!v) return null;
              const isAccept = d.kind === "accepted";
              return (
                <Card key={d.vid} className="flex items-start gap-4 px-5 py-4 shadow-elev-sm">
                  <div className="flex-1">
                    <div className="mb-1.5 flex items-center gap-2">
                      <span className="font-serif text-[16px] font-semibold">{v.person}</span>
                      <span className="text-[12.5px] text-[#6b7280]">- {v.decisionLabel}</span>
                      <Pill tone={isAccept ? "green" : "amber"}>
                        {isAccept ? "Approved" : "Manual"}
                      </Pill>
                    </div>
                    {!isAccept && d.kind === "override" && d.tags.length > 0 && (
                      <div className="mb-2 flex flex-wrap gap-1.5">
                        {d.tags.map((t) => (
                          <Pill key={t} tone="gold">
                            {t}
                          </Pill>
                        ))}
                      </div>
                    )}
                    <div className="grid gap-2 md:grid-cols-2">
                      <AuditField label="Context not in data" value={d.context} />
                      <AuditField label="Justification" value={d.justification} />
                    </div>
                  </div>
                  <Button onClick={() => openVignette(v.id)}>
                    Open
                    <Icon name="arrow" size={13} />
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
