import { useState } from "react";
import { Button } from "../ui/Button";
import { Chip } from "../ui/Chip";
import { Icon } from "../Icon";
import { OVERRIDE_TAGS } from "../../data";
import type { Vignette } from "../../types";

interface Props {
  v: Vignette;
  onClose: () => void;
  onConfirm: (payload: { tags: string[] }) => void;
}

export function OverrideModal({ v, onClose, onConfirm }: Props) {
  const [tags, setTags] = useState<string[]>([]);
  const valid = tags.length > 0;

  const toggleTag = (t: string) =>
    setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  return (
    <div
      className="fixed inset-0 z-50 flex animate-fadeIn items-center justify-center bg-ink/45 p-6 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[560px] animate-pop overflow-hidden rounded-xl bg-bg-elev shadow-elev-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-line px-[26px] pb-3.5 pt-[22px]">
          <div>
            <div className="m-0 text-[11px] uppercase tracking-[0.16em] text-[#6b7280]">
              Audit Log - Manual Decision
            </div>
            <h3 className="m-0 my-1 font-serif text-[22px] font-medium tracking-tight">
              Categorize your override
            </h3>
            <div className="text-[12.5px] text-[#6b7280]">
              {v.person} - {v.decisionLabel}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 text-[#6b7280] hover:text-ink"
          >
            <Icon name="x" size={18} />
          </button>
        </div>

        <div className="px-[26px] py-[22px]">
          <label className="mb-2 block text-[12px] font-medium tracking-[0.01em] text-ink">
            What made the difference? - Multiple selection
          </label>
          <div className="mb-1.5 flex flex-wrap gap-2">
            {OVERRIDE_TAGS.map((t) => (
              <Chip key={t} active={tags.includes(t)} onClick={() => toggleTag(t)}>
                {t}
              </Chip>
            ))}
          </div>
          <div className="text-[12px] text-[#6b7280]">
            Multiple reasons can apply at once - select all that fit. Your context and
            justification from the decision card are saved with this override.
          </div>
        </div>

        <div className="flex justify-end gap-2.5 border-t border-line bg-[#f3efe4] px-[26px] py-3.5">
          <Button onClick={onClose}>Cancel</Button>
          <Button
            variant="dark"
            disabled={!valid}
            onClick={() => onConfirm({ tags })}
          >
            Save manual decision
            <Icon name="arrow" size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}
