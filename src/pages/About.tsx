import { useState, type ReactNode } from "react";
import { Button } from "../components/ui/Button";
import { Icon } from "../components/Icon";
import { PageHeader } from "../components/PageHeader";
import { cn } from "../lib/cn";

interface Step {
  n: string;
  title: string;
  cite: string;
  body: ReactNode;
}

const STEPS: Step[] = [
  {
    n: "01",
    title: "Recommendations are prepared",
    cite: "Inbox",
    body: (
      <>
        <p>
          The system connects to your operational systems and creates a recommendation with
          rationale for each decision point. You find all open recommendations in your inbox each
          morning.
        </p>
        <p>
          Every recommendation includes the data points it is based on, a confidence estimate, and
          a note on the limits of its scope.
        </p>
      </>
    ),
  },
  {
    n: "02",
    title: "You review recommendation and rationale",
    cite: "Recommendation Review",
    body: (
      <>
        <p>
          In the review, you see the situation, the AI recommendation, and what it is based on. The
          key block is <em>"What the AI cannot see here"</em> - it explicitly names which aspects
          sit outside the data space.
        </p>
        <p>
          This lets you decide with context: the AI calculates, and you add the knowledge only you
          have - conversations, observations, and local changes.
        </p>
      </>
    ),
  },
  {
    n: "03",
    title: "Approve or decide manually",
    cite: "Decision",
    body: (
      <>
        <p>
          With one click, you approve the recommendation and send it into execution. If you choose a
          different path, briefly record a category and rationale. Both are saved to the audit log.
        </p>
        <p>
          Your manual decisions are not an "override conflict"; they are valuable input. They help
          calibrate the model further for your domain.
        </p>
      </>
    ),
  },
  {
    n: "04",
    title: "Insights and audit",
    cite: "Decision Insights",
    body: (
      <>
        <p>
          In Insights, you see across the period how many recommendations you approved, where you
          decided manually, and which rationales appear most often.
        </p>
        <p>
          This analysis is both an audit foundation and a reflection tool - for you, your team, and
          your compliance lead.
        </p>
      </>
    ),
  },
];

interface Props {
  goCockpit: () => void;
}

export function About({ goCockpit }: Props) {
  const [i, setI] = useState(0);
  const s = STEPS[i];

  return (
    <div>
      <PageHeader
        eyebrow="How it works"
        title="How you work with the system"
        description="Four steps that help you and the AI reach better operational decisions together - without a black box, with clear accountability."
      />

      <div className="mb-[22px] flex max-w-[680px] gap-1.5">
        {STEPS.map((_, idx) => (
          <div
            key={idx}
            className={cn(
              "h-1 flex-1 rounded-sm",
              idx < i ? "bg-gold" : idx === i ? "bg-ink" : "bg-line-strong",
            )}
          />
        ))}
      </div>

      <div
        key={i}
        className="max-w-[760px] animate-slideUp rounded-[12px] border border-line bg-bg-elev p-6 shadow-elev-sm md:p-9"
      >
        <div className="mb-3.5 flex items-baseline gap-[18px]">
          <span className="font-serif text-[56px] leading-none tracking-[-0.04em] text-gold">
            {s.n}
          </span>
          <div>
            <h3 className="m-0 mb-0.5 font-serif text-[24px] font-medium tracking-tight">
              {s.title}
            </h3>
            <div className="text-[12.5px] tracking-[0.04em] text-[#6b7280]">{s.cite}</div>
          </div>
        </div>
        <div className="space-y-3 text-[14.5px] leading-[1.65] text-ink-soft">{s.body}</div>

        <div className="mt-6 flex justify-between border-t border-line pt-[18px]">
          <Button onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0}>
            <Icon name="back" size={14} />
            Back
          </Button>
          {i < STEPS.length - 1 ? (
            <Button variant="dark" onClick={() => setI(i + 1)}>
              Next
              <Icon name="arrow" size={14} />
            </Button>
          ) : (
            <Button variant="dark" onClick={goCockpit}>
              Go to Inbox
              <Icon name="arrow" size={14} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
