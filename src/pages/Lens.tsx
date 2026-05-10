import { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";
import { Chip } from "../components/ui/Chip";
import { Icon } from "../components/Icon";
import { PageHeader } from "../components/PageHeader";
import { ScenarioCard } from "../components/lens/ScenarioCard";
import { ReasonCard } from "../components/lens/ReasonCard";
import { ConfidenceIndicator } from "../components/lens/ConfidenceIndicator";
import { DecisionSection } from "../components/lens/DecisionSection";
import { OverrideModal } from "../components/lens/OverrideModal";
import { VIGNETTES } from "../data";
import type { DecisionInput, DecisionMap } from "../types";

interface Props {
  vignetteId: string;
  openVignette: (id: string) => void;
  decisions: DecisionMap;
  recordDecision: (id: string, payload: DecisionInput) => void;
  backToCockpit: () => void;
}

export function Lens({
  vignetteId,
  openVignette,
  decisions,
  recordDecision,
  backToCockpit,
}: Props) {
  const [showOverride, setShowOverride] = useState(false);
  const [context, setContext] = useState("");
  const [justification, setJustification] = useState("");
  const v = VIGNETTES.find((x) => x.id === vignetteId) ?? VIGNETTES[0];
  const decision = decisions[v.id];

  useEffect(() => {
    setContext("");
    setJustification("");
    setShowOverride(false);
  }, [v.id]);

  return (
    <div>
      <Button onClick={backToCockpit} className="mb-[18px]">
        <Icon name="back" size={14} />
        Back to Inbox
      </Button>

      <PageHeader
        eyebrow={`Review recommendation - ${v.decisionLabel}`}
        title={`${v.person} - ${v.headline}`}
        className="mb-[18px]"
        titleClassName="mb-0"
      />

      <div className="mb-[18px] flex flex-wrap gap-2">
        {VIGNETTES.map((vi) => (
          <Chip key={vi.id} active={vi.id === v.id} onClick={() => openVignette(vi.id)}>
            {vi.person} - {vi.role.split(" ")[0]}
          </Chip>
        ))}
      </div>

      <div className="mb-[18px] flex flex-col gap-[18px]">
        <ScenarioCard v={v} />
        <ReasonCard v={v} />
        <ConfidenceIndicator v={v} />
        <DecisionSection
          v={v}
          decision={decision}
          context={context}
          justification={justification}
          onContextChange={setContext}
          onJustificationChange={setJustification}
          onAccept={() =>
            recordDecision(v.id, {
              kind: "accepted",
              context: context.trim(),
              justification: justification.trim(),
            })
          }
          onOpenOverride={() => setShowOverride(true)}
        />
      </div>

      {showOverride && (
        <OverrideModal
          v={v}
          onClose={() => setShowOverride(false)}
          onConfirm={({ tags }) => {
            recordDecision(v.id, {
              kind: "override",
              tags,
              reason: justification.trim(),
              context: context.trim(),
              justification: justification.trim(),
            });
            setShowOverride(false);
          }}
        />
      )}
    </div>
  );
}
