import { SectionPillar } from "./SectionPillar";
import type { Vignette } from "../../types";

interface Props {
  v: Vignette;
}

export function ConfidenceIndicator({ v }: Props) {
  return (
    <SectionPillar
      variant="B"
      tag="B - Domain"
      name="Knowledge Boundaries of the System"
      meta="WHAT THE SYSTEM SEES - AND WHAT IT DOESN'T"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-line bg-bg-elev px-5 py-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green" />
            <h4 className="m-0 font-serif text-[17px] font-medium tracking-tight text-ink">
              What the system knows
            </h4>
          </div>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {v.whatSystemKnows.map((item, i) => (
              <li
                key={i}
                className="flex gap-2.5 border-t border-line pt-2 text-[13.5px] leading-[1.5] text-ink first:border-t-0 first:pt-0"
              >
                <span className="mt-2 h-1 w-1 flex-none rounded-full bg-ink-soft" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-line bg-bg-elev px-5 py-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-gold" />
            <h4 className="m-0 font-serif text-[17px] font-medium tracking-tight text-ink">
              What the system doesn't know
            </h4>
          </div>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {v.whatSystemDoesntKnow.map((item, i) => (
              <li
                key={i}
                className="flex gap-2.5 border-t border-line pt-2 text-[13.5px] leading-[1.5] text-ink first:border-t-0 first:pt-0"
              >
                <span className="mt-2 h-1 w-1 flex-none rounded-full bg-ink-soft" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionPillar>
  );
}
