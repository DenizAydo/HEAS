import { Pill } from "./ui/Pill";
import type { Decision } from "../types";

type Status = Decision["kind"] | "open";

interface Props {
  status: Status;
}

export function StatusPill({ status }: Props) {
  if (status === "accepted") {
    return (
      <Pill tone="green" dot>
        Approved
      </Pill>
    );
  }
  if (status === "override") {
    return (
      <Pill tone="red" dot>
        Overridden
      </Pill>
    );
  }
  return (
    <Pill tone="neutral" dot>
      Waiting for you
    </Pill>
  );
}
